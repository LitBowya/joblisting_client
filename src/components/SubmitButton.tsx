import React, { ButtonHTMLAttributes } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { VariantProps } from "class-variance-authority";

interface SubmitButtonProps {
  text: string;
  isSubmitting: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

const SubmitButton = ({ text, isSubmitting, variant }: SubmitButtonProps) => {
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={isSubmitting}
      className="w-full"
    >
      {isSubmitting ? (
        <>
          <Spinner />
          <span className="ml-2">{`${text}...`}</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
};
export default SubmitButton;
