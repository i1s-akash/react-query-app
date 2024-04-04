import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { addProduct } from "../api";
import { Product } from "../product.interface";
import { PRODUCT } from "../utils/constant";

interface Props {
  open: boolean;
  setOpen: Function;
  viewKey: number;
  setViewKey: Function;
}

const Create: React.FC<Props> = (Props) => {
  const utiliseQC = useQueryClient();
  const [formData, setFormData] = useState<Product>(PRODUCT);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      utiliseQC.invalidateQueries({
        queryKey: ["products"],
      });
      setFormData(PRODUCT);
      Props.setViewKey(Props.viewKey === 1 ? 2 : 1);
      Props.setOpen(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Dialog open={Props.open} onClose={() => Props.setOpen(false)}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ padding: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price"
                fullWidth
                type="text"
                value={formData.price}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent="flex-start">
                <Grid item>
                  <Button
                    onClick={() => Props.setOpen(false)}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? "In Progress..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      {isError && (
        <DialogContent>
          <Typography color="error">{error?.message}</Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Create;
