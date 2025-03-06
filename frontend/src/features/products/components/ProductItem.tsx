import Grid from "@mui/material/Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";
import { Category } from '../../../types';

interface Props {
  title: string;
  price: number;
  id: string;
  description: string;
  image?: string | null | undefined;
  category: Category;
}

const ProductItem: React.FC<Props> = ({ title, price, id, image, category, description }) => {
  let productsImage = NoPictureImage;

  if (image) {
    productsImage = apiUrl + "/" + image;
  }

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Card>
        <CardHeader title={title} />
        <CardMedia
          style={{ width: "100%" }}
          component="img"
          image={productsImage}
          title={title}
        />

        <CardContent>
          <p><strong>Category: </strong>{category ? category.title : '-'}</p>
          <strong>Price: {price} KGS</strong>
          <p dangerouslySetInnerHTML={{__html: description}}/>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={"/products/" + id}>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
