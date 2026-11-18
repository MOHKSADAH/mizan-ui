"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { Button } from "@/registry/ui/button"
import { useDirection } from "@/registry/ui/direction"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  labels?: Partial<CarouselLabels>
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  labels: CarouselLabels
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

type CarouselLabels = { previous: string; next: string }

const defaultLabels: CarouselLabels = { previous: "Previous slide", next: "Next slide" }
const carouselLabelsAr: CarouselLabels = { previous: "الشريحة السابقة", next: "الشريحة التالية" }

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  labels,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const dir = useDirection()
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      direction: dir,
    },
    plugins
  )
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      api?.on("reInit", onChange).on("select", onChange)
      return () => {
        api?.off("reInit", onChange).off("select", onChange)
      }
    },
    [api]
  )
  const canScrollPrev = React.useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false)
  const canScrollNext = React.useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false)

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const prevKey = dir === "rtl" ? "ArrowRight" : "ArrowLeft"
      const nextKey = dir === "rtl" ? "ArrowLeft" : "ArrowRight"
      if (event.key === prevKey) {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === nextKey) {
        event.preventDefault()
        scrollNext()
      }
    },
    [dir, scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        labels: { ...defaultLabels, ...labels },
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev, labels } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -start-12 my-auto"
          : "-top-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <CaretLeftIcon className="rtl:rotate-180" />
      <span className="sr-only">{labels.previous}</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext, labels } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -end-12 my-auto"
          : "-bottom-12 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <CaretRightIcon className="rtl:rotate-180" />
      <span className="sr-only">{labels.next}</span>
    </Button>
  )
}

export {
  type CarouselApi,
  type CarouselLabels,
  carouselLabelsAr,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
