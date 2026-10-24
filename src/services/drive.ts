import { getAccessToken } from './auth';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
}

/**
 * Extracts a Google Drive File ID from various link formats or raw ID string.
 */
export function extractDriveFileId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Pattern 1: /file/d/FILE_ID
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD) return matchFileD[1];

  // Pattern 2: id=FILE_ID
  const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam) return matchIdParam[1];

  // Pattern 3: Direct ID (usually 25-50 alphanumeric characters)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Returns a high-res Google Drive direct preview URL for public or shared links.
 */
export function getDirectDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w3840`;
}

/**
 * Searches Google Drive for files named "Buddha Pag1.jpg" (or related images)
 */
export async function searchDriveForBuddhaImage(token?: string): Promise<{
  fileId: string;
  name: string;
  blobUrl: string;
  webContentLink?: string;
} | null> {
  const accessToken = token || getAccessToken();
  if (!accessToken) {
    throw new Error('Access token não encontrado. Por favor, conecte-se com o Google.');
  }

  // 1. Search for Buddha Pag1.jpg specifically first
  const query = "name contains 'Buddha' and (name contains 'Pag1' or name contains 'pag1') and trashed = false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&pageSize=10`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Google Drive API error:', errText);
    throw new Error(`Erro ao consultar Google Drive: ${response.statusText}`);
  }

  const data = await response.json();
  let targetFile: DriveFile | undefined = data.files?.[0];

  // If not found with strict filter, fallback to searching for Buddha or Pag1
  if (!targetFile) {
    const fallbackQuery = "(name contains 'Buddha' or name contains 'Pag1' or name contains 'pag1') and mimeType contains 'image' and trashed = false";
    const fbResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        fallbackQuery
      )}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (fbResponse.ok) {
      const fbData = await fbResponse.json();
      targetFile = fbData.files?.[0];
    }
  }

  if (!targetFile) {
    return null;
  }

  // Fetch the actual media binary and create a fast local Object URL for 100% reliable full background rendering
  const mediaUrl = `https://www.googleapis.com/drive/v3/files/${targetFile.id}?alt=media`;
  const mediaResponse = await fetch(mediaUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!mediaResponse.ok) {
    // If binary download fails due to permissions, return direct thumbnail CDN link
    return {
      fileId: targetFile.id,
      name: targetFile.name,
      blobUrl: getDirectDriveImageUrl(targetFile.id),
      webContentLink: targetFile.webContentLink,
    };
  }

  const blob = await mediaResponse.blob();
  const blobUrl = URL.createObjectURL(blob);

  return {
    fileId: targetFile.id,
    name: targetFile.name,
    blobUrl,
    webContentLink: targetFile.webContentLink,
  };
}
