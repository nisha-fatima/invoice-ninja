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
      <h3 className="mt-24 px-28 sm:px-48 font-bold">Create Client</h3>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Name"
              placeholder="Name"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:user-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <FormControl className="flex w-full" variant="outlined">
          <InputLabel id="category-select-label">Groups</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Category"
            className="mt-32"
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

        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Title"
              placeholder="Job title"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:briefcase
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Company"
              placeholder="Company"
              id="company"
              error={!!errors.company}
              helperText={errors?.company?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:office-building
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="emails"
          render={({ field }) => (
            <ContactEmailSelector className="mt-32" {...field} />
          )}
        />

        <Controller
          control={control}
          name="phoneNumbers"
          render={({ field }) => (
            <PhoneNumberSelector className="mt-32" {...field} />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Address"
              placeholder="Address"
              id="address"
              error={!!errors.address}
              helperText={errors?.address?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:location-marker
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field }) => (
            <DateTimePicker
              {...field}
              className="mt-8 mb-16 w-full"
              clearable
              showTodayButton
              renderInput={(_props) => (
                <TextField
                  {..._props}
                  className="mt-32"
                  id="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20}>
                          heroicons-solid:cake
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Notes"
              placeholder="Notes"
              id="notes"
              error={!!errors.notes}
              helperText={errors?.notes?.message}
              variant="outlined"
              fullWidth
              multiline
              minRows={5}
              maxRows={10}
              InputProps={{
                className: "max-h-min h-min items-start",
                startAdornment: (
                  <InputAdornment className="mt-16" position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:menu-alt-2
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
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
