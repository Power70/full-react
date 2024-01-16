import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSetting() {
    const queryClient = useQueryClient();
  
    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Setting successfully edited");
        queryClient.invalidateQueries({
          queryKey: ["Settings"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
  
    return {isUpdating, updateSetting};
}