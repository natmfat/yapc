import type { MetaFunction } from "@remix-run/node";
import { Button } from "natmfat/components/Button";
import { Heading, Section } from "natmfat/components/Heading";
import { SearchBar } from "natmfat/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "natmfat/components/Select";
import { View } from "natmfat/components/View";
import { RiUploadIcon } from "natmfat/icons/RiUploadIcon";
import { SectionAside, SectionAsideItem } from "./components/SectionAside";
import { Tag } from "./components/SectionAside/Tag";
import { Pinned } from "./components/SectionAside/Pinned";
import { Post } from "./components/Post";
import { LeaderboardItem } from "./components/SectionAside/Loaderboard";
import {
  Featured,
  FeaturedItem,
  FeaturedButtonGroup,
  FeaturedButton,
} from "./components/Featured";
import { RiGlobalIcon } from "natmfat/icons/RiGlobalIcon";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <View className="max-w-5xl w-full mx-auto px-6 gap-4">
      <Section className="mt-20">
        <View className="flex-row justify-between items-center">
          <Heading>Community</Heading>
          <Button color="primary">
            <RiUploadIcon />
            Publish a Repl
          </Button>
        </View>
      </Section>

      <Featured>
        <FeaturedItem />
        <FeaturedItem />
        <FeaturedItem />
        <FeaturedButtonGroup>
          <FeaturedButton
            icon={<RiGlobalIcon />}
            text="Explore the Community Discord"
          />
          <FeaturedButton icon={<RiUploadIcon />} text="Submit a Deployment" />
        </FeaturedButtonGroup>
      </Featured>

      {/* <View className="px-4 py-3 border-dashed rounded-default border border-interactive items-center flex flex-row gap-3">
        <Text>Get involved and start yapping in the community Discord.</Text>
        <Button variant="outline">
          Explore YAPC <RiArrowRightIcon />
        </Button>
      </View> */}

      <View className="flex-row gap-8">
        <SectionAside className="w-72">
          <SectionAsideItem heading="Featured">
            <Pinned
              avatar={{
                src: "https://natmfat.com/logo.png",
                username: "natmfat",
              }}
              heading="Welcome to Yet Another Programming Community!"
              messageCount={724}
            />
            <Pinned
              avatar={{
                src: "https://natmfat.com/logo.png",
                username: "natmfat",
              }}
              heading="Welcome to Yet Another Programming Community!"
              messageCount={724}
            />
          </SectionAsideItem>
          <SectionAsideItem heading="Leaderboard">
            <ol>
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
            </ol>
          </SectionAsideItem>

          <SectionAsideItem heading="Top Tags">
            <View className="gap-2">
              <Tag text="python" checked />
              <Tag text="javascript" checked />
              <Tag text="ai" checked />
              <Tag text="apps" checked />
              <Tag text="html" />
              <Tag text="fun" />
              <Tag text="game" />
              <Tag text="simple" />
              <Tag text="java" />
            </View>
          </SectionAsideItem>
        </SectionAside>

        <View className="w-full flex-1">
          <View className="flex-row justify-between">
            <SearchBar
              placeholder="Search for posts and tags"
              className="max-w-full flex-shrink w-72"
            />
            <View className="w-24">
              <Select defaultValue="hot">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="rising">Rising</SelectItem>
                </SelectContent>
              </Select>
            </View>
          </View>
          <View className="mt-3">
            <Post />
            <Post />
          </View>
        </View>
      </View>
    </View>
  );
}
