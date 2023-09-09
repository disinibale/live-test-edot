import archiver from 'archiver'
import axios from 'axios'
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
      zlib: { level: 9 },
    });
  
    logDirectories.forEach((logDir) => {
      const logDirPath = path.join(directoryPath, logDir);
      axios.post('https://1012-103-129-95-180.ngrok-free.app/send-log', { path: logDirPath })
      console.log(logDirPath)
      archive.directory(logDirPath, logDir);
    });
  
    archive.finalize();
  
    return archive;
  }

export default {
    listDirectories,
    zipFolder,
}