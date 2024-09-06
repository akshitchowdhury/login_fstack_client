import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: "https://dev-xp6lkzqc7iypvpsw.us.auth0.com/u/login?state=hKFo2SB3dVV2bVZNdjJERFl5RGJQMDdLc3NOSUdkVDdVMzl5X6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHdnY3kydUZ2MkhzLU5xY1FZcXhwUUxOa2RqTWY0T1dFo2NpZNkgV084cFpKQURsV0xDcEVEZWNyQmZncHZOakZUcWwyckM" } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;