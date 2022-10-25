import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import FuseScrollbars from '@fuse/core/FuseScrollbars';

import {
  selectFilteredContacts,
  selectGroupedFilteredContacts,
} from "./store/contactsSlice";
import ContactListItem from "./ContactListItem";
import {
  Checkbox,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TablePagination,
} from "@mui/material";

function ContactsList(props) {
  const filteredData = useSelector(selectFilteredContacts);
  const groupedFilteredContacts = useSelector(selectGroupedFilteredContacts);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex flex-col flex-auto w-full max-h-full"
        >
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow className="h-48 sm:h-64">
                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Number
                </TableCell>

                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Name
                </TableCell>

                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Balance
                </TableCell>

                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Paid to Date
                </TableCell>
                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Contact Name
                </TableCell>
                <TableCell
                  className="w-[15%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Contact Email
                </TableCell>
                <TableCell
                  className="w-[10%] p-2 md:p-16 text-center"
                  component="th"
                  scope="row"
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          {Object.entries(groupedFilteredContacts).map(([key, group]) => {
            return (
              <div key={key} className="relative">
                {/* <Typography color="text.secondary" className="px-32 py-4 text-14 font-medium">
              {key}
            </Typography>
            <Divider /> */}
                <List className="w-full m-0 p-0">
                  {group.children.map((item) => (
                    <ContactListItem key={item.id} contact={item} />
                  ))}
                </List>
              </div>
            );
          })}
        </motion.div>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={10}
        rowsPerPage={10}
        page={1}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={() =>{}}
        onRowsPerPageChange={() => { }}
      />
    </div>
  );
}

export default ContactsList;
