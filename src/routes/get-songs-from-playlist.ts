import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getSongsFromPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/playlists/:playlistId/songs",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            playlistId: z.string().uuid(),
            playlistName: z.string(),
            songs: z.array(
              z.object({
                id: z.string().uuid(),
                song: z.object({
                  title: z.string(),
                  artist: z.object({
                    name: z.string(),
                  }),
                }),
              })
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;

      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
        select: {
          id: true,
          name: true,
          songs: {
            select: {
              id: true,
              song: {
                select: {
                  title: true,
                  artist: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              song: {
                title: "asc",
              },
            },
          },
        },
      });

      if (!playlist) {
        return reply.status(404).send({ message: "Playlist não encontrada" });
      }

      return reply.send({
        playlistId: playlist.id,
        playlistName: playlist.name,
        songs: playlist.songs,
      });
    }
  );
}
