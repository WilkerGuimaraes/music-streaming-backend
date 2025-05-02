import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getPlaylists(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/playlists", async (request, reply) => {
      const playlists = await prisma.playlist.findMany({
        include: {
          songs: true,
        },
      });

      const playlistsWithSongCount = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        songCount: playlist.songs.length,
      }));

      return playlistsWithSongCount;
    });
}
