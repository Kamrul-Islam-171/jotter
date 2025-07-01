import { Router } from "express";
import { UserRoutes } from "../modules/Users/user.route";

import { AuthValidationRoute } from "../modules/auth/auth.route";
import { FolderRoutes } from "../modules/Folder/folder.route";
import { NoteRoutes } from "../modules/Note/note.route";
import { ImportRoutes } from "../modules/ImportFile/ImportFile.route";


const router = Router();

const moduleroutes = [
    {
        path: '/users',
        route: UserRoutes
    },
   
    {
        path: '/auth',
        route: AuthValidationRoute
    },
    {
        path: '/folder',
        route: FolderRoutes
    },
    {
        path: '/note',
        route: NoteRoutes
    },
    {
        path: '/import',
        route: ImportRoutes
    },
   

]

moduleroutes.forEach((route) => router.use(route.path, route.route))

export default router;