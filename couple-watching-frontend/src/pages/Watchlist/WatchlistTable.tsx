import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Movie } from "../../types/Watchlist.types";
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { motion } from "motion/react";
import MovieActions from "../../components/Watchlist/MovieActions";
import { useIntl } from "react-intl";

interface WatchlistTableProps {
   data: Movie[];
}

const WatchlistTable = ({ data }: WatchlistTableProps) => {
   const columnHelper = createColumnHelper<Movie>();
   const { formatMessage } = useIntl();

   const columns = [
      columnHelper.accessor("title", {
         cell: (info) => (
            <Typography variant="body1">{`${info.row.original.title} (${info.row.original.productionYear})`}</Typography>
         ),
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.MOVIE" }),
      }),
      columnHelper.accessor("genre", {
         cell: (info) => info.getValue().join(", "),
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.GENRE" }),
      }),
      columnHelper.accessor("director", {
         cell: (info) => info.getValue(),
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.DIRECTOR" }),
      }),
      columnHelper.accessor("duration", {
         cell: (info) => formatMessage({ id: "WATCHLIST.TABLE.CELL.DURATION.MINUTES" }, { minutes: info.getValue() }),
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.DURATION" }),
      }),
      columnHelper.accessor("imdbReview", {
         cell: (info) => info.getValue(),
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.IMDB_REVIEW" }),
      }),
      columnHelper.display({
         id: "actions",
         header: formatMessage({ id: "WATCHLIST.TABLE.HEADER.ACTIONS" }),
         cell: () => <MovieActions />,
      }),
   ];

   const watchlistTable = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <Card sx={{ borderRadius: 4, border: "2px solid", borderColor: "primary.main" }}>
         <TableContainer
            sx={{ width: "100%" }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
         >
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
      </Card>
   );
};

export default WatchlistTable;
