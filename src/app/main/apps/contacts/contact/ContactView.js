import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import format from "date-fns/format";
import _ from "@lodash";
import { getContact, selectContact } from "../store/contactSlice";
import { selectCountries } from "../store/countriesSlice";
import { selectTags } from "../store/tagsSlice";

const ContactView = () => {
  const contact = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getContact(routeParams.id));
  }, [dispatch, routeParams]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }

  if (!contact) {
    return <FuseLoading />;
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <div className=" flex justify-between mr-12 ml-8 mt-20">
        <Typography className="mb-5 text-4xl font-bold truncate">
          {contact.name}
        </Typography>
      </div>
      <Box className="flex flex-wrap items-center justify-between">
        <TabContext value={value} className="mt-4">
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: "#970DFF",
              },
            }}
            sx={{
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="ml-24"
          >
            <Tab
              disableRipple
              label={<p className={value == 0 && "text-black"}>Overview</p>}
              {...a11yProps(0)}
            />
            <Tab
              disableRipple
              label={<p className={value == 1 && "text-black"}>Details</p>}
              {...a11yProps(1)}
            />
            <Tab
              disableRipple
              label={<p className={value == 2 && "text-black"}>Documents</p>}
              {...a11yProps(2)}
            />
            <Tab
              disableRipple
              label={<p className={value == 3 && "text-black"}>Ledger</p>}
              {...a11yProps(3)}
            />
            <Tab
              disableRipple
              label={<p className={value == 4 && "text-black"}>Activity</p>}
              {...a11yProps(4)}
            />
            <Tab
              disableRipple
              label={<p className={value == 5 && "text-black"}>Systems Logs</p>}
              {...a11yProps(5)}
            />
          </TabList>
        </TabContext>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <div className="relative flex flex-col flex-auto items-center">
            <div className="w-full max-w-3xl">
              <div className="flex flex-col justify-center items-center w-full mt-8 p-32 shadow-contact">
                <h1 className="font-extrabold  text-center">
                  Let's do Business International BV
                </h1>
                <h6 className="mt-8 text-center">Bert van Duivendijk</h6>
              </div>

              <div className="flex flex-col space-y-32">
                <div className="mt-[24px] p-32 shadow-contact">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FuseSvgIcon>house</FuseSvgIcon>
                      <h4 className="ml-10 leading-6">Contact info</h4>
                    </div>
                    <div className="flex items-center mb-10">
                      <Button
                        variant="contained"
                        color="secondary"
                        component={NavLinkAdapter}
                        to="edit"
                      >
                        <FuseSvgIcon size={20}>
                          heroicons-outline:pencil-alt
                        </FuseSvgIcon>
                        <span className="mx-8">Edit</span>
                      </Button>
                    </div>
                  </div>
                  <div className="border-bottom-contact w-full"></div>

                  <div className="">
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        Company name
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        Let's do business international BV
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        Name
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        Bert van Duivendijk
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        Address
                      </p>
                      <p className="pl-12 w-8/12 font-inter font-medium leading-loose text-normal">
                        Rudolf Nureyevstraat 29, 1326 TC Almere, The Netherlands
                        <Link to="/" className="ml-4">Map</Link>
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        CoC number
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        -
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        VAT number
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        -
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        Phone number
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        -
                      </p>
                    </div>
                    <div className="flex mt-5">
                      <p className="w-4/12 font-bold leading-loose text-normal">
                        Customer id
                      </p>
                      <p className="pl-12 font-inter font-medium leading-loose text-normal">
                        1
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>contact_mail</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Invoices</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>schedule</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Tasks</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>request_page</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Expenses</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>credit_card</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Payments</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>description</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Credits</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>business_center</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Projects</h3>
                  </div>
                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>restore_page</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Notes</h3>
                  </div>

                  2 Active
                </div>
                
                <div className="p-24 flex items-center justify-between shadow-contact">
                  <div className="flex items-center">
                    <FuseSvgIcon>restore_page</FuseSvgIcon>
                    <h3 className="ml-24 leading-6">Deals</h3>
                  </div>

                  2 Active
                </div>
              </div>
            </div>
          </div>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="flex flex-col space-y-32">
          <div className="flex items-center">
            <FuseSvgIcon>mail</FuseSvgIcon>
            <h3 className="ml-24 leading-6">Blank Contact</h3>
          </div>
          <div className="flex justify-around">
            <Button
              className="w-[150px]"
              variant="contained"
              color="secondary"
              component={NavLinkAdapter}
              to="view_portal"
            >
              View Portal
            </Button>
            <Button
              className="w-[150px]"
              variant="contained"
              color="secondary"
              component={NavLinkAdapter}
              to="view_portal"
            >
              Copy Link
            </Button>
          </div>
          <div className="flex items-center">
            <FuseSvgIcon>domain</FuseSvgIcon>
            <h3 className="ml-24 leading-6">
              100 <div className="font-light">ID Number</div>
            </h3>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="flex justify-around">
          <Button
            className="w-[500px]"
            variant="contained"
            color="secondary"
            component={NavLinkAdapter}
            to="upload_file"
          >
            <FuseSvgIcon>description</FuseSvgIcon>
            Upload File
          </Button>
        </div>
        <Divider className="mt-10 mb-24 font-semibold" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="flex flex-col space-y-32">
          <div className="flex items-center justify-between shadow-contact">
            <div className="flex items-center">
              <FuseSvgIcon>group</FuseSvgIcon>
              <h3 className="ml-24 leading-6">
                Client Created{" "}
                <h4 className="font-light">
                  11/Sep/2022 <span>1:42:08 AM</span>
                </h4>
              </h3>
            </div>
            <div>$0.00</div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div className="flex flex-col space-y-32">
          <div className="flex items-center justify-between shadow-contact">
            <div className="flex items-center">
              <FuseSvgIcon>group</FuseSvgIcon>
              <h3 className="ml-24 leading-6">
                sander anga created client Test{" "}
                <h4 className="font-light">
                  11/Sep/2022 <span>1:42:08 AM 103.4.95.4</span>
                </h4>
              </h3>
            </div>
            <FuseSvgIcon>chevron_right</FuseSvgIcon>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className="flex flex-col space-y-32">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FuseSvgIcon>group</FuseSvgIcon>
              <h3 className="ml-24 leading-6">
                sander anga created client Test{" "}
                <h4 className="font-light">
                  11/Sep/2022 <span>1:42:08 AM 103.4.95.4</span>
                </h4>
              </h3>
            </div>
            <FuseSvgIcon>chevron_right</FuseSvgIcon>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};

export default ContactView;
