import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

function listDirectories(dirPath: string): string[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const result: string[] = []

    entries.forEach((entry) => {
        if (entry.isDirectory() && entry.name.startsWith('Log-')) {
            result.push(entry.name)
        }
    })

    return result
}

function zipFolder(directoryPath: string): archiver.Archiver {
    const logDirectories = listDirectories(directoryPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Set compression level (0 to 9; 9 is maximum compression)
    });
  
    // Add each log directory to the archive
    logDirectories.forEach((logDir) => {
      const logDirPath = path.join(directoryPath, logDir);
      console.log(logDirPath)
      archive.directory(logDirPath, logDir); // Add the directory to the archive
    });
  
    // Finalize the archive
    archive.finalize();
  
    return archive;
  }

export default {
    listDirectories,
    zipFolder,
}