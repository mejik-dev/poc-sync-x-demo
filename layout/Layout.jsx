import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { setCookie } from "../utils/cookie";

export const Layout = ({ children, title }) => {
  const pageTitle = title ? `${title}` : "My App";
  const router = useRouter();

  const selectedRoute = router.pathname.split("/")[1];

  const onLogout = React.useCallback(() => {
    setCookie("token", "");
    window.location.href = "/auth/login";
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Stack
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <AppBar
          sx={{
            background: "white",
          }}
          position="static"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Button
                sx={() => ({
                  textTransform: "none",
                  color: selectedRoute === "employee" ? undefined : "black",
                })}
                onClick={() => {
                  router.push("/agent");
                }}
                size="large"
              >
                Agents
              </Button>
            </Box>
            <Button variant="contained" onClick={onLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Stack sx={{ overflow: "auto" }}>{children}</Stack>
      </Stack>
    </>
  );
};
