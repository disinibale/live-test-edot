import express from 'express';

import fs from 'fs'
import path from 'path'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const targetFolder = fs.readdirSync('D:/win.temp/AppData/shared/.steam', { withFileTypes: true })
    const availableFolder: string[] = []

    targetFolder.forEach((folder) => {
        if (folder.isDirectory() && folder.name.startsWith('Log')) {
            availableFolder.push(folder.name)
        }
    })

    res.status(200).json(availableFolder)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
