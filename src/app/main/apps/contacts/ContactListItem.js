import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import {
  Checkbox,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import ContactsHeader from "./ContactsHeader.js";
import { lighten } from "@mui/material/styles";

function ContactListItem(props) {
  const { contact } = props;
  return (
    <>
      <Table
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.7)
              : lighten(theme.palette.background.default, 0.10),
        }}
        className="min-w-xl"
        aria-labelledby="tableTitle"
      >
        <TableBody>
          <TableRow
            className="h-72 cursor-pointer"
            hover
            role="checkbox"
            aria-checked={false}
            tabIndex={-1}
            key={contact?.id}
            selected={false}
            // onClick={(event) => handleClick(n)}
          >
            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.company}
            </TableCell>

            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.name}
            </TableCell>
            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.phoneNumbers[0]?.phoneNumber}
            </TableCell>
            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.birthday}
            </TableCell>

            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.company}
            </TableCell>

            <TableCell
              className="w-[15%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              {contact?.emails[0]?.email}
            </TableCell>

            <TableCell
              className="w-[10%] p-2 md:p-16 text-center"
              component="th"
              scope="row"
              align="center"
            >
              <div className="flex justify-center items-center">
                <FuseSvgIcon className="text-secondary" size={20}>
                  heroicons-outline:dots-vertical
                </FuseSvgIcon>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider />
    </>
  );
}

export default ContactListItem;
