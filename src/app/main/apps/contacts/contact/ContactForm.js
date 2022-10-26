import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  addContact,
  getContact,
  newContact,
  removeContact,
  selectContact,
  updateContact,
} from "../store/contactSlice";
import { selectCountries } from "../store/countriesSlice";
import { selectTags } from "../store/tagsSlice";
import ContactEmailSelector from "./email-selector/ContactEmailSelector";
import PhoneNumberSelector from "./phone-number-selector/PhoneNumberSelector";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

const ContactForm = (props) => {
  const contact = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  useEffect(() => {
    if (routeParams.id === "new") {
      dispatch(newContact());
    } else {
      dispatch(getContact(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...contact });
  }, [contact, reset]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (routeParams.id === "new") {
      dispatch(addContact(data)).then(({ payload }) => {
        navigate(`/apps/contacts/${payload.id}`);
      });
    } else {
      dispatch(updateContact(data));
    }
  }

  function handleRemoveContact() {
    dispatch(removeContact(contact.id)).then(() => {
      navigate("/apps/contacts");
    });
  }

  if (_.isEmpty(form) || !contact) {
    return <FuseLoading />;
  }

  return (
    <>
      <h3 className="mt-24 px-28 sm:px-48 font-bold">Client Info</h3>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="Name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Name"
              placeholder="Name"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Groups</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Groups"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "4dd" },
              { slug: "dddsss", title: "4ddss" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Users</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Users"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "Abu Yousuf" },
              { slug: "dddsss", title: "sander anga" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          control={control}
          name="ID Number"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="ID Number"
              placeholder="ID Number"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="VAT Number"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="VAT Number"
              placeholder="VAT Number"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Website"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Website"
              placeholder="Website"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Phone"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Phone"
              placeholder="Phone"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Public Notes"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Public Notes"
              placeholder="Public Notes"
              id="notes"
              error={!!errors.notes}
              helperText={errors?.notes?.message}
              variant="outlined"
              fullWidth
              multiline
              minRows={5}
              maxRows={10}
            />
          )}
        />

        <Controller
          control={control}
          name="Private Notes"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Private Notes"
              placeholder="Private Notes"
              id="notes"
              error={!!errors.notes}
              helperText={errors?.notes?.message}
              variant="outlined"
              fullWidth
              multiline
              minRows={5}
              maxRows={10}
            />
          )}
        />

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Size</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Size"
          >
            {[
              { slug: "ddd", title: "1 - 3" },
              { slug: "dddsss", title: "4 - 10" },
              { slug: "ddd", title: "11 - 50" },
              { slug: "dddsss", title: "51 - 100" },
              { slug: "ddd", title: "101 - 500" },
              { slug: "dddsss", title: "500+" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          control={control}
          name="Industry"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Industry"
              placeholder="Industry"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="First Name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="First Name"
              placeholder="First Name"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Last Name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Last Name"
              placeholder="Last Name"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Email"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Email"
              placeholder="Email"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Phone"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Phone"
              placeholder="Phone"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Currency</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Currency"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "USD" },
              { slug: "dddsss", title: "EURO" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Language</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Language"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "ENGLISH" },
              { slug: "dddsss", title: "URDU" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">
            Invoive Payments Terms
          </InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Invoive Payments Terms"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "Net 0" },
              { slug: "dddsss", title: "Net 4" },
              { slug: "ddd", title: "Net 7" },
              { slug: "dddsss", title: "Net 14" },
              { slug: "ddd", title: "Net 30" },
              { slug: "dddsss", title: "Net 60" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Quote Valid Until</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Quote Valid Until"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "Net 0" },
              { slug: "dddsss", title: "Net 4" },
              { slug: "ddd", title: "Net 7" },
              { slug: "dddsss", title: "Net 14" },
              { slug: "ddd", title: "Net 30" },
              { slug: "dddsss", title: "Net 60" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Task Rate</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Task Rate"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "4dd" },
              { slug: "dddsss", title: "4ddss" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Send Reminders</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Send Reminders"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "Enabled" },
              { slug: "dddsss", title: "Disabled" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          control={control}
          name="Billing Street"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Billing Street"
              placeholder="Billing Street"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Apt/Suite"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Apt/Suite"
              placeholder="Apt/Suite"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="City"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="City"
              placeholder="City"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="State/Province"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="State/Province"
              placeholder="State/Province"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Postal Code"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Postal Code"
              placeholder="Postal Code"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <FormControl className="flex w-full mt-32" variant="outlined">
          <InputLabel id="category-select-label">Country</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            placeholder="Country"
          >
            <MenuItem value="all">
              <em> All </em>
            </MenuItem>
            {[
              { slug: "ddd", title: "Algeria" },
              { slug: "dddsss", title: "Pakistan" },
              { slug: "ddd", title: "Netherlands" },
              { slug: "dddsss", title: "Spain" },
            ].map((category) => (
              <MenuItem value={category.slug} key={category.slug}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          control={control}
          name="Shipping Street"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Shipping Street"
              placeholder="Shipping Street"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Apt/Suite"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Apt/Suite"
              placeholder="Apt/Suite"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="City"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="City"
              placeholder="City"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="State/Province"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="State/Province"
              placeholder="State/Province"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Postal Code"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Postal Code"
              placeholder="Postal Code"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="Country"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Country"
              placeholder="Country"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: "background.default" }}
      >
        {routeParams.id !== "new" && (
          <Button color="error" onClick={handleRemoveContact}>
            Delete
          </Button>
        )}
        <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
          Cancel
        </Button>
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default ContactForm;
