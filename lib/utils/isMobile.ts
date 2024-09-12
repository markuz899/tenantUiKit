const isMobile = () => {
  const window: { navigator?: string } = {};
  let isMob = false;

  const userAgent =
    typeof window?.navigator === "undefined" ? "" : navigator.userAgent;
  const mobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );
  isMob = mobile;

  return isMob;
};

const isAppleDevice = () => {
  const userAgent = navigator.userAgent;

  return /iPad|iPhone|iPod|Macintosh/.test(userAgent);
};

export { isMobile, isAppleDevice };
