import express, { Request, Response } from 'express';

import path from 'path'
import fs from 'fs'
import archiver from 'archiver';

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    const { targetPath, downloadName } = req.body

    if (!targetPath) {
        res.status(400).json({ error: 'Target path is required' })
    }

    if (!fs.existsSync(targetPath)) {
        res.status(404).send('File not found')
        return
    }

    try {
        const files = fs.readdirSync(targetPath)

        if (files.length === 0) {
            return res.status(404).send('No files')
        }

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${downloadName ? downloadName : 'app'}.zip"`);

        const archive = archiver('zip', {
            zlib: { level: 1 }
        })

        archive.pipe(res)

        files.forEach(file => {
            const videoFilePath = path.join(targetPath, file)
            archive.file(videoFilePath, { name: file })
        })
        archive.finalize()
    } catch (err) {
        console.log(err)
        res.status(500).send('Error')
    }
});

app.get('/list-all', async (req, res) => {
    const { targetPath, downloadName } = req.body

    if (!targetPath) {
        res.status(400).json({ error: 'Target path is required' })
    }

    if (!fs.existsSync(targetPath)) {
        res.status(404).send('File not found')
        return
    }

    try {
        const files = fs.readdirSync(targetPath)

        if (files.length === 0) {
            return res.status(404).send('No files')
        }

        res.send(files)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error')
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
