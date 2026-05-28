import { formatCurrency, formatSubscriptionDateTime } from "@/lib/utils";
import { clsx } from "clsx";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SubscriptionCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
  expanded,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(`sub-card`, expanded ? `sub-card-expanded` : `bg-card`)}
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head">

        <View className="sub-main">
          <Image source={icon} className="sub-icon" />
          <View className="sub-copy">
            <Text className="sub-title" numberOfLines={1}>
              {name}
            </Text>
            <Text className="sub-meta" numberOfLines={1} ellipsizeMode="tail">
              {category?.trim() ||
                plan?.trim() ||
                (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
            </Text>
          </View>

          <View className="sub-price-box">
            <Text className="sub-price">{formatCurrency(price, currency)}</Text>
            <Text className="sub-billing">{billing}</Text>
          </View>
        </View>
      </View>
       {expanded && (
        <View className="sub-expanded">
            <Text className="sub-expanded-text">Subscription Detail Goes here</Text>
        </View>
       )}
    </Pressable>
  );
};

export default SubscriptionCard;
