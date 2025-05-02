import fastify from "fastify";
import { env } from "../env";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createMusic } from "./routes/create-music";
import { getMusics } from "./routes/get-musics";
import { getArtists } from "./routes/get-artists";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/", () => {
  return "Hello World!";
});

app.register(createMusic);
app.register(getMusics);
app.register(getArtists);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!");
});
