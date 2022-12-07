import { useAuth } from "@/hooks/use-user";
import { User } from "@/interfaces/index";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { memo } from "react";
interface ManagerUserProps {
  users: User[];
  deleteUser: (id: string) => void;
  addEmployee: (id: string) => void;
}

function ManagerUser({ users, addEmployee, deleteUser }: ManagerUserProps) {
  const { profile } = useAuth();
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "Họ", width: 130 },
    { field: "lastName", headerName: "Tên", width: 130 },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      width: 90,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "role",
      headerName: "Quyền",
      width: 100,
      renderCell: (params) => {
        return (
          <p
            className={`font-semibold ${
              params.value === "CUSTOMER"
                ? "text-sky-500"
                : params.value === "EMPLOYEE"
                ? "text-indigo-600"
                : "text-red-600"
            } `}
          >
            {params.value}
          </p>
        );
      },
    },
    {
      field: "add",
      headerName: "Thêm nhân viên",
      width: 120,
      renderCell: (params) => {
        return params.row.role !== "ADMIN" &&
          params.row.role !== "EMPLOYEE" &&
          profile?.role === "ADMIN" ? (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Bạn chắc chắn muốn chuyển người này thành nhân viên?"
                )
              ) {
                addEmployee(params.id as string);
              }
            }}
            className="px-2 py-1 text-sm bg-indigo-600 rounded-md text-white"
          >
            Thêm
          </button>
        ) : null;
      },
    },
    {
      field: "delete",
      headerName: "Xóa người dùng",
      width: 150,
      renderCell: (params) => {
        return params.row.role !== "ADMIN" &&
          params.row.role !== "EMPLOYEE" &&
          profile?.role === "ADMIN" ? (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Bạn chắc chắn muốn chuyển người này thành nhân viên?"
                )
              ) {
                deleteUser(params.id as string);
              }
            }}
            className="px-2 py-1 text-sm bg-red-600 rounded-md text-white"
          >
            Xóa
          </button>
        ) : null;
      },
    },
  ];
  return (
    <div className="h-[600px]">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default memo(ManagerUser);
