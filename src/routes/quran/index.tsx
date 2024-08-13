import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "@yakad/lib";
import { Button, Loading } from "@yakad/ui";

import NavigationList from "./navigationList";
import Symbol from "@yakad/symbols";
import { Xpanel } from "@yakad/x";

import SurahHeader from "./surahHeader";
import SurahText from "./text";
import { SurahProps } from "./text";

export interface QuranConfigProps {
    translationView: boolean;
}

export default function Quran() {
    const config: QuranConfigProps = { translationView: true };

    const { id } = useParams();
    const surahFetch = useFetch<SurahProps>(
        process.env.REACT_APP_API_URL + `/surah/${id}?mushaf=hafs`,
        {
            method: "GET",
        }
    );

    const translationFetch = useFetch<SurahProps>(
        process.env.REACT_APP_API_URL +
            `/translation/4345d724-7bed-4b88-9264-c93048b8fc2f?surah_uuid=${id}`,
        {
            method: "GET",
        }
    );

    useEffect(() => {
        surahFetch.send();
        translationFetch.send();
    }, []);

    const appbarName = surahFetch.isResponseBodyReady
        ? "Quran " +
          surahFetch.responseBody.surah_number +
          ":" +
          surahFetch.responseBody.surah_name
        : "Quran";

    return (
        <Xpanel
            name={appbarName}
            navigationChildren={<NavigationList />}
            appbarChildren={
                <Link to="/search">
                    <Button icon={<Symbol icon="search" />} />
                </Link>
            }
        >
            {!surahFetch.isResponseBodyReady ? (
                <Loading size="large" />
            ) : (
                <>
                    <SurahHeader
                        config={config}
                        surahData={surahFetch.responseBody}
                        bismilaaaahTranslation="tewst"
                    />
                    <SurahText
                        config={config}
                        surahData={surahFetch.responseBody}
                        translationData={translationFetch.responseBody}
                    />
                </>
            )}
        </Xpanel>
    );
}
