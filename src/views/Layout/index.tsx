import { ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import { initTheme } from "../../Theme/theme";

import { getStorage, setStorage } from "../../utils/Storage";

export enum LocaleType {
  en = "en",
  zh_CN = "zh-cn",
}

export enum ThemeType {
  dark = "dark",
  light = "light",
}

interface LanguageProp {
  [key: string]: Locale;
}

const Language: LanguageProp = {
  en: enUS,
  "zh-cn": zhCN,
};

export const DataContext = createContext({});

const Layout = (props: any) => {
  console.log(props);
  const [locale, setLocale] = useState<LocaleType>(LocaleType.en);
  const [theme, setTheme] = useState<string>(ThemeType.light);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const res = getStorage("locale") as LocaleType;

    setLocale(res);

    setUsername("dapan");
  }, []);
  useEffect(() => {
    setStorage("locale", locale);
  }, [locale]);

  useEffect(() => {
    setStorage("theme", theme);
    initTheme(theme);
  }, [theme]);

  return (
    <DataContext.Provider
      value={{ locale, setLocale, username, theme, setTheme }}
    >
      <ConfigProvider locale={Language[locale]}>
        <Header></Header>

        <div className={"layout-box"}>{props.children}</div>
      </ConfigProvider>
    </DataContext.Provider>
  );
};

export default Layout;
