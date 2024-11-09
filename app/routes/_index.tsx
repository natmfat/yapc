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
import { Text } from "natmfat/components/Text";
import { View } from "natmfat/components/View";
import { RiArrowRightIcon } from "natmfat/icons/RiArrowRightIcon";
import { RiUploadIcon } from "natmfat/icons/RiUploadIcon";

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

      {/* <View className="px-4 py-3 border-dashed rounded-default border border-interactive items-center flex flex-row gap-3">
        <Text>Get involved and start yapping in the community Discord.</Text>
        <Button variant="outline">
          Explore YAPC <RiArrowRightIcon />
        </Button>
      </View> */}

      <View className="flex-row gap-2">
        <View className="flex-shrink-0 w-64">
          <Text className="uppercase" color="dimmest">
            Featured
          </Text>

          <Text className="uppercase" color="dimmest">
            Leaderboard
          </Text>

          <Text className="uppercase" color="dimmest">
            Tags
          </Text>
        </View>
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
        </View>
      </View>
    </View>
  );
}
