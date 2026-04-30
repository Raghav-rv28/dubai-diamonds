import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  hoverSrc,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  hoverSrc?: string;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  const hasHoverImage = Boolean(hoverSrc && isInteractive);

  return (
    <div
      className={clsx(
        "group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-black dark:bg-black",
        {
          "border-2 border-black": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        },
      )}
    >
      {props.src ? (
        <>
          <Image
            className={clsx("relative h-full w-full object-contain", {
              "transition duration-300 ease-in-out": isInteractive,
              "group-hover:scale-105": isInteractive && !hasHoverImage,
              "group-hover:opacity-0": hasHoverImage,
            })}
            {...props}
          />
          {hasHoverImage ? (
            <Image
              {...props}
              src={hoverSrc!}
              className="h-full w-full object-contain opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"
            />
          ) : null}
        </>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
