import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Limpar todos os dados existentes (opcional)
  await prisma.playlistSong.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.song.deleteMany();
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();

  // Criar artistas
  const artists = await prisma.artist.createMany({
    data: [
      { id: "2e76d543-e473-4eed-a8cc-04d7eefac9fb", name: "Sophie Peixoto" },
      { id: "cb72ce53-c66d-4841-ba4f-aebf16945f09", name: "Francisco Silva" },
      { id: "d7e0eb9c-6bd7-4e28-b6e0-a231e8cb9385", name: "Juliana Jesus" },
      { id: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7", name: "Isabella da Rosa" },
      { id: "fa3cb7a3-77f2-4aab-9a06-03b5190d6288", name: "Beatriz Gomes" },
      {
        id: "4f2b5947-6634-400e-96da-e1a0973336fb",
        name: "Vitor Gabriel Castro",
      },
      { id: "64cf5b9b-2e26-457b-9b11-f497f8318780", name: "Yasmin Fernandes" },
      {
        id: "65e8eb3b-cd6e-4b00-945a-c0e15f03b7be",
        name: "Rafaela da Conceição",
      },
      { id: "e79c4496-bbd5-4de9-ac82-ad1573b8757b", name: "Caio Cardoso" },
      { id: "d03504c8-0b87-4f89-a4f0-62466a1e8882", name: "Helena Ribeiro" },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${artists.count} artists`);

  // Criar álbuns
  const albums = await prisma.album.createMany({
    data: [
      {
        id: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
        title: "Occaecati Album",
        artistId: "fa3cb7a3-77f2-4aab-9a06-03b5190d6288",
      },
      {
        id: "7964546d-1775-47b5-bd48-397f4d5bb28a",
        title: "Consectetur Album",
        artistId: "2e76d543-e473-4eed-a8cc-04d7eefac9fb",
      },
      {
        id: "c8e51634-89f4-4055-aa79-a09beda0343e",
        title: "Beatae Album",
        artistId: "2e76d543-e473-4eed-a8cc-04d7eefac9fb",
      },
      {
        id: "ab75a188-f2f2-44c1-bff0-a70e460d6aea",
        title: "Ipsum Album",
        artistId: "d03504c8-0b87-4f89-a4f0-62466a1e8882",
      },
      {
        id: "7c45e244-61c6-45d2-8d4e-3ac6ea1ad665",
        title: "Quaerat Album",
        artistId: "65e8eb3b-cd6e-4b00-945a-c0e15f03b7be",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${albums.count} albums`);

  // Criar músicas
  const songs = await prisma.song.createMany({
    data: [
      {
        id: "9d9311fb-fbad-46bb-aea3-a61fbad46bae",
        title: "Molestias enim at reiciendis",
        artistId: "fa3cb7a3-77f2-4aab-9a06-03b5190d6288",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "71f0f0ca-87c8-45cb-823c-c9a002ce50ba",
        title: "Doloribus delectus reprehenderit",
        artistId: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7",
        albumId: "ab75a188-f2f2-44c1-bff0-a70e460d6aea",
      },
      {
        id: "04cd1466-37f4-4c37-8b6e-ade5e4360e30",
        title: "Voluptatem ea architecto perspiciatis",
        artistId: "d03504c8-0b87-4f89-a4f0-62466a1e8882",
        albumId: "ab75a188-f2f2-44c1-bff0-a70e460d6aea",
      },
      {
        id: "06d3a246-bdd8-4212-bf49-6512c016abed",
        title: "Unde sapiente",
        artistId: "cb72ce53-c66d-4841-ba4f-aebf16945f09",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "3dc6051b-9ffe-4d4c-b279-e90b3ca2a688",
        title: "Placeat saepe minima",
        artistId: "e79c4496-bbd5-4de9-ac82-ad1573b8757b",
        albumId: null,
      },
      {
        id: "553656a0-d9ea-4fbc-b29f-1ed93bdd5c0e",
        title: "Sed tempora",
        artistId: "2e76d543-e473-4eed-a8cc-04d7eefac9fb",
        albumId: null,
      },
      {
        id: "f72deebf-4295-402d-a1ea-5c93f6bdefdc",
        title: "Neque iste optio",
        artistId: "fa3cb7a3-77f2-4aab-9a06-03b5190d6288",
        albumId: null,
      },
      {
        id: "10ef8609-3852-431a-886a-01e4da848812",
        title: "Aspernatur nostrum laborum",
        artistId: "65e8eb3b-cd6e-4b00-945a-c0e15f03b7be",
        albumId: null,
      },
      {
        id: "9d0311df-0882-49e0-bf1e-358fb88e39a0",
        title: "Sapiente doloribus quasi",
        artistId: "d03504c8-0b87-4f89-a4f0-62466a1e8882",
        albumId: null,
      },
      {
        id: "65b1ee50-8b8f-4fb3-bceb-6317252422bc",
        title: "Fuga cupiditate",
        artistId: "4f2b5947-6634-400e-96da-e1a0973336fb",
        albumId: "7964546d-1775-47b5-bd48-397f4d5bb28a",
      },
      {
        id: "79628510-e4e0-4839-8316-5772e1e48e08",
        title: "Aut corporis",
        artistId: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7",
        albumId: "c8e51634-89f4-4055-aa79-a09beda0343e",
      },
      {
        id: "7cd627db-12b6-4117-bd64-ee8e2c794bdd",
        title: "Aliquid nemo",
        artistId: "4f2b5947-6634-400e-96da-e1a0973336fb",
        albumId: null,
      },
      {
        id: "09fc1626-66d6-43e0-8c71-dbbe49f27ef3",
        title: "Perspiciatis ad odio non",
        artistId: "64cf5b9b-2e26-457b-9b11-f497f8318780",
        albumId: null,
      },
      {
        id: "d7cf44d2-0838-4201-81aa-520d014082e1",
        title: "Hic fuga",
        artistId: "d7e0eb9c-6bd7-4e28-b6e0-a231e8cb9385",
        albumId: null,
      },
      {
        id: "dff4b774-0974-42ef-99a8-a40274aaa5d1",
        title: "Sequi",
        artistId: "64cf5b9b-2e26-457b-9b11-f497f8318780",
        albumId: "c8e51634-89f4-4055-aa79-a09beda0343e",
      },
      {
        id: "a7503e12-b228-4ea7-9e8c-b3237b109aff",
        title: "Vero delectus",
        artistId: "e79c4496-bbd5-4de9-ac82-ad1573b8757b",
        albumId: "7c45e244-61c6-45d2-8d4e-3ac6ea1ad665",
      },
      {
        id: "d56ebcce-f678-4e29-9971-6929a1138d7c",
        title: "Distinctio reiciendis vel",
        artistId: "64cf5b9b-2e26-457b-9b11-f497f8318780",
        albumId: "ab75a188-f2f2-44c1-bff0-a70e460d6aea",
      },
      {
        id: "6ac9e427-e209-4645-9d2f-d07f7ac9df9a",
        title: "Incidunt aut ea",
        artistId: "65e8eb3b-cd6e-4b00-945a-c0e15f03b7be",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "f29694a8-95dc-4248-9b69-ab4994cdab58",
        title: "Officia expedita",
        artistId: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7",
        albumId: "ab75a188-f2f2-44c1-bff0-a70e460d6aea",
      },
      {
        id: "54a8c830-0651-4eb4-91a0-d3d409734b2e",
        title: "Magnam aliquam",
        artistId: "65e8eb3b-cd6e-4b00-945a-c0e15f03b7be",
        albumId: "7c45e244-61c6-45d2-8d4e-3ac6ea1ad665",
      },
      {
        id: "4be5b953-fdf3-4346-a86e-22f731a035b4",
        title: "Dicta facere quasi",
        artistId: "4f2b5947-6634-400e-96da-e1a0973336fb",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "304433a8-3823-47ed-86af-93df23a78acc",
        title: "Possimus dignissimos",
        artistId: "4f2b5947-6634-400e-96da-e1a0973336fb",
        albumId: null,
      },
      {
        id: "bffaac07-7312-41b0-9664-c70c2a5085cc",
        title: "Ratione culpa",
        artistId: "e79c4496-bbd5-4de9-ac82-ad1573b8757b",
        albumId: null,
      },
      {
        id: "11ce8a00-ecad-4160-8d35-ddf220db8594",
        title: "Minus blanditiis ullam",
        artistId: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7",
        albumId: "7964546d-1775-47b5-bd48-397f4d5bb28a",
      },
      {
        id: "1e7997c7-f82c-4e6f-8bc9-389456caefd7",
        title: "Accusamus perspiciatis",
        artistId: "cb72ce53-c66d-4841-ba4f-aebf16945f09",
        albumId: null,
      },
      {
        id: "df8498f2-358c-48da-b7c4-21cf5054ccda",
        title: "Totam officiis harum",
        artistId: "cb72ce53-c66d-4841-ba4f-aebf16945f09",
        albumId: null,
      },
      {
        id: "54857002-da92-4c2c-a030-f017affd7400",
        title: "Corrupti porro",
        artistId: "d03504c8-0b87-4f89-a4f0-62466a1e8882",
        albumId: null,
      },
      {
        id: "5b2ed3a6-67c6-4590-986b-297ea6c177cb",
        title: "Excepturi aliquid",
        artistId: "4f2b5947-6634-400e-96da-e1a0973336fb",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "318d5ee0-5a25-430d-91d0-f2610b12bd96",
        title: "Dolores veritatis",
        artistId: "6c2df55e-2cf6-4e04-964e-c2db4b7b7ff7",
        albumId: "048d11c1-2dd4-4496-890c-b158c6fb61eb",
      },
      {
        id: "22ed85f9-7f43-4b69-825b-3f0e5058e757",
        title: "Enim facere veniam odio",
        artistId: "cb72ce53-c66d-4841-ba4f-aebf16945f09",
        albumId: "7964546d-1775-47b5-bd48-397f4d5bb28a",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${songs.count} songs`);

  // Criar playlists
  const playlists = await prisma.playlist.createMany({
    data: [
      { id: "ff474787-5735-43e8-ac39-67da63238e99", name: "Eaque Playlist" },
      { id: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201", name: "Amet Playlist" },
      { id: "59363fc6-2f7e-46c9-b7a9-3e8022ff1230", name: "Mollitia Playlist" },
      { id: "a742263f-7304-408f-9be3-bf02bdd9c3cd", name: "Numquam Playlist" },
      { id: "14cb4d3b-293c-4843-82ae-784cc7d0d742", name: "Minima Playlist" },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${playlists.count} playlists`);

  // Criar relacionamentos entre playlists e músicas
  const playlistSongs = await prisma.playlistSong.createMany({
    data: [
      // Músicas na playlist 'Eaque Playlist'
      {
        id: "11d63cd7-c539-485e-bf61-07fcb94f1794",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "04cd1466-37f4-4c37-8b6e-ade5e4360e30",
      },
      {
        id: "2fedb8f5-5dd6-476b-9283-fd407b14c9e0",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "06d3a246-bdd8-4212-bf49-6512c016abed",
      },
      {
        id: "1e136d8f-30ed-4f03-bd93-f3c1a3a079eb",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "f29694a8-95dc-4248-9b69-ab4994cdab58",
      },
      {
        id: "61c9f7aa-526f-4ee9-aeda-9fd64ef0bbd2",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "04cd1466-37f4-4c37-8b6e-ade5e4360e30",
      },
      {
        id: "a5cd828e-2a4a-4c95-8689-48e17e1f1303",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "22ed85f9-7f43-4b69-825b-3f0e5058e757",
      },
      {
        id: "4fd0407b-cae3-4de7-978c-500b106ba8a2",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "4be5b953-fdf3-4346-a86e-22f731a035b4",
      },
      {
        id: "5a6d5544-5567-42e0-b922-5197d862bd76",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "3dc6051b-9ffe-4d4c-b279-e90b3ca2a688",
      },
      {
        id: "abea310b-3a49-4fc0-9599-24b999807db9",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "10ef8609-3852-431a-886a-01e4da848812",
      },
      {
        id: "d1a2e790-725a-4ccd-a27d-a78c23c38d6f",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "553656a0-d9ea-4fbc-b29f-1ed93bdd5c0e",
      },
      {
        id: "0a50fc6a-3395-4563-bc9e-0df621076e13",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "7cd627db-12b6-4117-bd64-ee8e2c794bdd",
      },
      {
        id: "48b13581-03f4-4429-8fe1-48ac9d33e27a",
        playlistId: "ff474787-5735-43e8-ac39-67da63238e99",
        songId: "09fc1626-66d6-43e0-8c71-dbbe49f27ef3",
      },

      // Músicas na playlist 'Amet Playlist'
      {
        id: "2a14b847-685e-4b64-9425-8420b34b7763",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "a7503e12-b228-4ea7-9e8c-b3237b109aff",
      },
      {
        id: "09e56b15-6386-42bb-bb13-bd184381dc7b",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "d56ebcce-f678-4e29-9971-6929a1138d7c",
      },
      {
        id: "cf03d0a0-fbf4-4c77-9a52-69feb7a39052",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "4be5b953-fdf3-4346-a86e-22f731a035b4",
      },
      {
        id: "a89f9d81-f439-49e0-bbd5-4d411cb62a6f",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "04cd1466-37f4-4c37-8b6e-ade5e4360e30",
      },
      {
        id: "8eccc777-addb-45e6-88ef-d62d64447a1c",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "f29694a8-95dc-4248-9b69-ab4994cdab58",
      },
      {
        id: "ecd37ea7-e6ea-4b49-802d-e06fd8652f24",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "65b1ee50-8b8f-4fb3-bceb-6317252422bc",
      },
      {
        id: "e4f48b0f-b72d-422d-b350-59ae91ecfbf1",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "1e7997c7-f82c-4e6f-8bc9-389456caefd7",
      },
      {
        id: "3a0eb60d-1a8b-4712-b53a-9cf9e94b77ad",
        playlistId: "61ba6a5f-ef10-462d-aaf2-ba746a1f6201",
        songId: "22ed85f9-7f43-4b69-825b-3f0e5058e757",
      },

      // Músicas na playlist 'Mollitia Playlist'
      {
        id: "56bb880d-59b4-4ac3-b1be-da36a9eb09a3",
        playlistId: "59363fc6-2f7e-46c9-b7a9-3e8022ff1230",
        songId: "79628510-e4e0-4839-8316-5772e1e48e08",
      },
      {
        id: "19f5959d-c2c0-4e56-a86d-e71e4f0dc7f7",
        playlistId: "59363fc6-2f7e-46c9-b7a9-3e8022ff1230",
        songId: "dff4b774-0974-42ef-99a8-a40274aaa5d1",
      },
      {
        id: "20b71fb07c40",
        playlistId: "59363fc6-2f7e-46c9-b7a9-3e8022ff1230",
        songId: "318d5ee0-5a25-430d-91d0-f2610b12bd96",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${playlistSongs.count} playlist-song relationships`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
