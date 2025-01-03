import React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "../components/ui/button";

export const SubmitButton = ({ isLoading, onSubmit,disabled }) => {
  return (
    <div className="flex justify-end">
      <Button
        type="button"
        className="bg-purple-600 dark:text-white hover:bg-purple-700"
        onClick={onSubmit}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          "Submit Pipeline"
        )}
      </Button>
    </div>
  );
};
