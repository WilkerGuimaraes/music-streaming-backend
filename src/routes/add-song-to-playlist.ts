import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function addSongToPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/playlists/:playlistId/songs",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
        body: z.object({
          songId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;
      const { songId } = request.body;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
      });

      if (!playlist) {
        return reply.status(404).send({
          message: "Playlist não encontrada.",
        });
      }

      const song = await prisma.song.findUnique({
        where: { id: songId },
      });

      if (!song) {
        return reply.status(404).send({
          message: "Música não encontrada.",
        });
      }

      const alreadyInPlaylist = await prisma.playlistSong.findUnique({
        where: {
          playlistId_songId: {
            playlistId,
            songId,
          },
        },
      });

      if (alreadyInPlaylist) {
        return reply.status(400).send({
          message: "Essa música já está na playlist.",
        });
      }

      const playlistSong = await prisma.playlistSong.create({
        data: {
          playlistId,
          songId,
        },
      });

      return reply.status(201).send({
        message: "Música adicionada à playlist com sucesso!",
        playlistSong,
      });
    }
  );
}
