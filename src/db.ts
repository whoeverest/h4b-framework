import { Todo } from './todos'
import { File } from './files';

export const db: { ['todos']: Todo[], files: { [key: string]: File} } = { todos: [], files: {}}