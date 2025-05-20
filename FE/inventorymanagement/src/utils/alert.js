import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 // hoặc .scss nếu bạn custom

export const showSuccess = (title = "Thành công!", text = "") =>
  Swal.fire({ icon: "success", title, text });

export const showError = (title = "Lỗi!", text = "") =>
  Swal.fire({ icon: "error", title, text });


export const showConfirm = async (text = "Bạn chắc chắn?") => {
    return await Swal.fire({
      title: "Xác nhận",
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });
  };



// Hỏi xác nhận xoá
export const showDelete = async (text = "Bạn chắc chắn muốn xóa?") => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });
  
    return result.isConfirmed;
  };
  