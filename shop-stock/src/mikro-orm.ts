import { MikroORM } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config.js";

export default await MikroORM.init(config);
