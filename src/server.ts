import fastify from "fastify";
import { env } from "../env";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createMusic } from "./routes/create-music";
import { getMusics } from "./routes/get-musics";
import { getArtists } from "./routes/get-artists";
import { getArtistSongs } from "./routes/get-artists-songs";
import { getAlbums } from "./routes/get-albums";
import { getAlbumSongs } from "./routes/get-album-songs";
import { createPlaylist } from "./routes/create-playlist";
import { getPlaylists } from "./routes/get-playlists";
import { getSongsNotInPlaylist } from "./routes/get-songs-not-in-playlist";
import { addSongToPlaylist } from "./routes/add-song-to-playlist";
import { updatePlaylist } from "./routes/update-playlist";
import { getSongsFromPlaylist } from "./routes/get-songs-from-playlist";
import { deleteSong } from "./routes/delete-song";
import { deletePlaylist } from "./routes/delete-playlist";
import { removeSongFromPlaylist } from "./routes/remove-song-from-playlist";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Streaming music",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(createMusic);
app.register(getMusics);
app.register(getArtists);
app.register(getArtistSongs);
app.register(getAlbums);
app.register(getAlbumSongs);
app.register(createPlaylist);
app.register(getPlaylists);
app.register(getSongsNotInPlaylist);
app.register(addSongToPlaylist);
app.register(updatePlaylist);
app.register(getSongsFromPlaylist);
app.register(deleteSong);
app.register(deletePlaylist);
app.register(removeSongFromPlaylist);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!");
});
