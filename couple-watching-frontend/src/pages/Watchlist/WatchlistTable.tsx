import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Movie } from "../../types/Watchlist.types";
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "motion/react";

interface WatchlistTableProps {
   data: Movie[];
}

const WatchlistTable = ({ data }: WatchlistTableProps) => {
   const columnHelper = createColumnHelper<Movie>();

   const columns = [
      columnHelper.accessor("title", {
         cell: (info) => (
            <Stack direction="row" spacing={2} alignItems="center">
               <LazyLoadImage
                  src={info.row.original.cover}
                  alt={info.row.original.title}
                  height={100}
                  effect="blur"
                  style={{ borderRadius: "4px" }}
               />
               <Typography variant="body1">{`${info.row.original.title} (${info.row.original.productionYear})`}</Typography>
            </Stack>
         ),
         header: "Movie",
      }),
      columnHelper.accessor("genre", {
         cell: (info) => info.getValue(),
         header: "Genre",
      }),
      columnHelper.accessor("imdbReview", {
         cell: (info) => info.getValue(),
         header: "IMDB Review",
      }),
   ];

   const watchlistTable = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <TableContainer sx={{ width: "100%" }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <Table size="small">
            <TableHead>
               {watchlistTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <TableCell
                           key={header.id}
                           sx={{
                              width: header.getSize(),
                              fontWeight: 600,
                              color: "primary.main",
                              borderBottom: "2px solid",
                              borderColor: "primary.main",
                           }}
                        >
                           <Typography variant="h6">
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(header.column.columnDef.header, header.getContext())}
                           </Typography>
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableHead>
            <TableBody>
               {watchlistTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                     {row.getVisibleCells().map((cell) => (
                        <TableCell sx={{ borderBottom: "2px solid", borderColor: "primary.main" }} key={cell.id}>
                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default WatchlistTable;
