import { useState } from "react";

import { UserProps } from "@/pages/my_page";

import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";

const Profile = ({ props }: { props: UserProps }) => {
  // 編集操作中であるかどうかをisEditingで管理
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = (boolState: boolean) => {
    setIsEditing(boolState);
  };

  return (
    <div>
      {/* {isEditの状態で編集ページとビューページを切り替え} */}
      {isEditing ? (
        <EditProfile handleEditButton={handleEditButton} />
      ) : (
        <ViewProfile props={props} handleEditButton={handleEditButton} />
      )}
    </div>
  );
};

export default Profile;
