import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCategory } from "@/hooks/use-category";
import Link from "next/link";

export default function Sidebar() {
  const { categories } = useCategory();
  return (
    <div className="shadow-sm">
      {categories?.map((cgory, idx) => (
        <Accordion key={cgory._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{cgory.categoryName}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {cgory.types.map((type, index) => (
              <Link
                key={index}
                href={`/products?categoryType=${type}`}
                passHref
                legacyBehavior
              >
                <a>
                  <p className="my-3 uppercase hover:opacity-70 text-gray-600">
                    {type}
                  </p>
                </a>
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
