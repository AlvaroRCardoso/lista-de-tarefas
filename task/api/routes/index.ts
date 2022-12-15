import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import routerTipos from './tipos';
import routerTarefas from './tarefas';
import path from 'path';

const router = express.Router();

router.use(cors());
router.use('/static', express.static(path.join(__dirname, '../uploads'))); // deixar diretório de imagens público e sem auth
router.use(routerTipos);
router.use(routerTarefas);

export default router;