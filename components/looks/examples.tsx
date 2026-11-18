'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
  ArrowRightIcon,
  BellIcon,
  CameraIcon,
  CheckIcon,
  CreditCardIcon,
  HeartIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  WalletIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { Avatar, AvatarFallback } from '@/registry/ui/avatar';
import { Badge } from '@/registry/ui/badge';
import { Button } from '@/registry/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/ui/card';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/registry/ui/field';
import { Input } from '@/registry/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/registry/ui/input-group';
import { Label } from '@/registry/ui/label';
import { Price } from '@/registry/ui/price';
import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/ui/select';
import { Separator } from '@/registry/ui/separator';
import { Switch } from '@/registry/ui/switch';
import { formatDate, formatNumber, formatPercent, plural } from '@/registry/lib/format';
import { SITE, T, type Lang } from '@/lib/strings';
import { BrandChip } from '@/components/brand-mark';
import { Masonry } from '@/components/looks/masonry';
import { bidi, rich, useLooks } from '@/components/looks/text';

type Props = { lang: Lang };

// The strings file types its row arrays loosely, so the rows are narrowed here.
type CartRow = [id: string, icon: string, name: string, price: number];
type StepRow = [label: string, iso: string, done: boolean, icon: string];
type NotifyRow = [title: string, desc: string, on: boolean];
type ReviewRow = [initials: string, who: string, text: string, stars: number];
type BadgeRow = [label: string, variant: string];

const VAT: Record<string, number> = { SAR: 0.15, AED: 0.05, OMR: 0.05, BHD: 0.1, KWD: 0, QAR: 0, EGP: 0.14, USD: 0, EUR: 0.2, GBP: 0.2 };
const ICONS = { camera: CameraIcon, wallet: WalletIcon, package: PackageIcon, 'credit-card': CreditCardIcon, truck: TruckIcon };

const showToast = (t: (typeof T)['en']['toast']) =>
  toast(t.title, { description: t.desc, action: { label: t.undo, onClick: () => {} }, closeButton: true, duration: Infinity });

function Stars({ value, label }: { value: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex text-warning">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} aria-hidden="true" weight={i < value ? 'fill' : 'regular'} className="size-4" />
      ))}
    </span>
  );
}

function ProductCard({ lang }: Props) {
  const { locale, digits, currency, sep } = useLooks(lang);
  const p = T[lang].product;
  const [wished, setWished] = React.useState(false);
  const rating = formatNumber(p.rating, locale);
  return (
    <Card className="pt-0">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted text-muted-foreground">
        <CameraIcon aria-hidden="true" className="size-16" />
        <Badge variant="destructive" className="absolute start-3 top-3">
          {p.sale}
        </Badge>
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute end-3 top-3 bg-background"
          aria-label={p.wish}
          aria-pressed={wished}
          onClick={() => setWished(!wished)}
        >
          <HeartIcon weight={wished ? 'fill' : undefined} />
        </Button>
      </div>
      <CardHeader>
        <p className="text-sm text-muted-foreground">{p.cat}</p>
        <CardTitle>{p.name}</CardTitle>
        <div className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
          <Stars value={4} label={SITE[lang].ratingOf.replace('{r}', rating) + sep + plural(p.reviews, T[lang].reviewsCount, locale)} />
          <span>
            {rating} · {plural(p.reviews, T[lang].reviewsCount, locale)}
          </span>
        </div>
      </CardHeader>
      <CardFooter className="flex-wrap justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <Price amount={p.price} currency={currency} lang={lang} digits={digits} className="text-lg font-semibold" />
          <del className="text-sm text-muted-foreground">
            <span className="sr-only">{p.oldPrice} </span>
            <Price amount={p.old} currency={currency} lang={lang} digits={digits} />
          </del>
        </div>
        <Button onClick={() => showToast(T[lang].toast)}>
          <ShoppingCartIcon data-icon="inline-start" />
          {p.add}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CartCard({ lang }: Props) {
  const { locale, digits, currency, sep } = useLooks(lang);
  const c = T[lang].cart;
  const items = c.items as CartRow[];
  const [qty, setQty] = React.useState<Record<string, number>>({ camera: 1, wallet: 2 });
  const [live, setLive] = React.useState('');
  const subtotal = items.reduce((s, [id, , , price]) => s + price * qty[id], 0);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const rate = VAT[currency] ?? 0;
  const change = (id: string, d: number) => {
    const next = Math.min(9, Math.max(1, qty[id] + d));
    setQty({ ...qty, [id]: next });
    setLive(c.qtyNow.replace('{n}', formatNumber(next, locale)));
  };
  const money = (amount: number, className?: string) => (
    <Price amount={amount} currency={currency} lang={lang} digits={digits} decimals className={className} />
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{c.title}</CardTitle>
          <Badge variant="secondary">{plural(count, T[lang].itemsCount, locale)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {items.map(([id, icon, name, price]) => {
          const Icon = ICONS[icon as keyof typeof ICONS];
          return (
            <div key={id} className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <p className="truncate font-medium">{name}</p>
                <Price amount={price} currency={currency} lang={lang} digits={digits} className="text-sm text-muted-foreground" />
              </div>
              <div role="group" aria-label={`${c.qty}${sep}${name}`} className="flex items-center rounded-lg border">
                <Button variant="ghost" size="icon-sm" aria-label={c.dec} disabled={qty[id] <= 1} onClick={() => change(id, -1)}>
                  <MinusIcon weight="bold" />
                </Button>
                <output className="min-w-6 text-center text-sm tabular-nums">{formatNumber(qty[id], locale)}</output>
                <Button variant="ghost" size="icon-sm" aria-label={c.inc} disabled={qty[id] >= 9} onClick={() => change(id, 1)}>
                  <PlusIcon weight="bold" />
                </Button>
              </div>
            </div>
          );
        })}
        <p role="status" className="sr-only">
          {live}
        </p>
        <Separator />
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{c.subtotal}</span>
            {money(subtotal)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{c.shipping}</span>
            <Badge className="bg-success text-success-foreground">{c.free}</Badge>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>{c.total}</span>
            {money(subtotal)}
          </div>
          <p className="text-muted-foreground">{T[lang].vat(rate ? formatPercent(rate, locale) : '')}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {c.checkout}
          <ArrowRightIcon data-icon="inline-end" className="rtl:rotate-180" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function PaymentCard({ lang }: Props) {
  const { locale } = useLooks(lang);
  const p = T[lang].pay;
  const id = React.useId();
  const [method, setMethod] = React.useState('mada');
  const [month, setMonth] = React.useState('1');
  const [year, setYear] = React.useState('2026');
  const two = (n: number) => formatNumber(n, locale, { minimumIntegerDigits: 2, useGrouping: false });
  const months = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [String(i + 1), two(i + 1)]));
  const years = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [String(2026 + i), formatNumber(2026 + i, locale, { useGrouping: false })]));
  const zeros = formatNumber(0, locale, { minimumIntegerDigits: 4, useGrouping: false });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{p.title}</CardTitle>
        <CardDescription>{p.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RadioGroup aria-label={p.title} value={method} onValueChange={setMethod}>
          {p.methods.map(([slug, label]) => (
            <FieldLabel key={slug} htmlFor={`${id}-${slug}`}>
              <Field orientation="horizontal">
                <BrandChip slug={slug} />
                <FieldContent>
                  <FieldTitle>{bidi(label, lang)}</FieldTitle>
                </FieldContent>
                <RadioGroupItem id={`${id}-${slug}`} value={slug} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-name`}>{p.name}</Label>
          <Input id={`${id}-name`} autoComplete="cc-name" placeholder={p.namePh} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-number`}>{p.number}</Label>
          <Input
            id={`${id}-number`}
            dir="ltr"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder={Array(4).fill(zeros).join(' ')}
            className="tabular-nums"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor={`${id}-month`}>{p.month}</Label>
            <Select items={months} value={month} onValueChange={(v) => v && setMonth(v)}>
              <SelectTrigger id={`${id}-month`} className="w-full border-field-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {Object.entries(months).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor={`${id}-year`}>{p.year}</Label>
            <Select items={years} value={year} onValueChange={(v) => v && setYear(v)}>
              <SelectTrigger id={`${id}-year`} className="w-full border-field-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {Object.entries(years).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor={`${id}-cvc`}>{bidi(p.cvc, lang)}</Label>
            <Input
              id={`${id}-cvc`}
              dir="ltr"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder={formatNumber(123, locale, { useGrouping: false })}
              className="tabular-nums"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{p.cont}</Button>
      </CardFooter>
    </Card>
  );
}

function AccountCard({ lang }: Props) {
  const { locale } = useLooks(lang);
  const a = T[lang].account;
  const id = React.useId();
  const [password, setPassword] = React.useState('12345');
  const invalid = password.length < 8;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{a.title}</CardTitle>
        <CardDescription>{a.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-email`}>{a.email}</Label>
          <Input id={`${id}-email`} type="email" dir="ltr" autoComplete="email" spellCheck={false} placeholder={a.emailPh} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-phone`}>
            {a.phone}
            <span className="sr-only"> (+966)</span>
          </Label>
          <InputGroup dir="ltr">
            <InputGroupAddon>
              <InputGroupText aria-hidden="true">+{formatNumber(966, locale, { useGrouping: false })}</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id={`${id}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="5X XXX XXXX"
              aria-describedby={`${id}-phone-hint`}
            />
          </InputGroup>
          <p id={`${id}-phone-hint`} className="text-sm text-muted-foreground">
            {a.phoneHint}
          </p>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-pw`}>{a.password}</Label>
          <Input
            id={`${id}-pw`}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-pw-error` : undefined}
          />
          {invalid && (
            <p id={`${id}-pw-error`} className="flex items-start gap-1.5 text-sm text-destructive">
              <WarningIcon weight="fill" aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>{rich(a.pwErr, locale)}</span>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid gap-3">
        <Button className="w-full">{a.create}</Button>
        <p className="text-center text-sm text-muted-foreground">
          {a.or}{' '}
          <a href="#examples" className="text-foreground underline underline-offset-4">
            {a.signin}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

function StatusCard({ lang }: Props) {
  const { locale } = useLooks(lang);
  const s = T[lang].status;
  const steps = s.steps as StepRow[];
  const when = (iso: string) =>
    formatDate(new Date(iso + 'Z'), { ...locale, timeZone: 'UTC' }, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  const arrival = formatDate(new Date(Date.UTC(2026, 10, 19)), { ...locale, timeZone: 'UTC' }, { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="grid gap-1">
            <CardTitle>{bidi(s.title, lang)}</CardTitle>
            <CardDescription>
              {s.arrives} {arrival}
            </CardDescription>
          </div>
          <Badge className="bg-info text-info-foreground">
            <TruckIcon data-icon="inline-start" />
            {s.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ol>
          {steps.map(([label, iso, done, icon], i) => {
            const Icon = done ? CheckIcon : ICONS[icon as keyof typeof ICONS];
            return (
              <li key={iso} className="relative flex gap-3 pb-5 last:pb-0">
                {i < steps.length - 1 && <span aria-hidden="true" className="absolute start-4 top-9 -bottom-1 w-px bg-border" />}
                <span
                  className={
                    done
                      ? 'z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground'
                      : 'z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-card text-muted-foreground'
                  }
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div className="grid gap-0.5 pt-1">
                  <p className="font-medium">
                    {done && <span className="sr-only">{s.done}: </span>}
                    {label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {!done && `${s.expected} `}
                    <time dateTime={iso}>{when(iso)}</time>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {s.track}
        </Button>
      </CardFooter>
    </Card>
  );
}

function NotifyCard({ lang }: Props) {
  const n = T[lang].notify;
  const id = React.useId();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{n.title}</CardTitle>
        <CardDescription>{n.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {(n.items as NotifyRow[]).map(([title, desc, on], i) => (
          <Field key={title} orientation="horizontal" className="items-start">
            <FieldContent>
              <span id={`${id}-${i}`} className="text-sm leading-snug font-medium">
                {title}
              </span>
              <FieldDescription id={`${id}-${i}-d`}>{desc}</FieldDescription>
            </FieldContent>
            <Switch defaultChecked={on} aria-labelledby={`${id}-${i}`} aria-describedby={`${id}-${i}-d`} />
          </Field>
        ))}
      </CardContent>
    </Card>
  );
}

function ReviewsCard({ lang }: Props) {
  const { locale } = useLooks(lang);
  const r = T[lang].reviews;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{r.title}</CardTitle>
        <CardDescription>{r.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {(r.items as ReviewRow[]).map(([initials, who, text, stars], i) => (
          <React.Fragment key={who}>
            {i > 0 && <Separator />}
            <div className="flex items-start gap-3">
              <Avatar aria-hidden="true">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{who}</span>
                  <Stars value={stars} label={SITE[lang].ratingOf.replace('{r}', formatNumber(stars, locale))} />
                </div>
                <p className="text-muted-foreground">{text}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

function PlanCard({ lang }: Props) {
  const { digits, currency } = useLooks(lang);
  const p = T[lang].plan;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{p.title}</CardTitle>
          <Badge>{p.badge}</Badge>
        </div>
        <CardDescription>{p.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-baseline gap-1.5">
          <Price amount={p.price} currency={currency} lang={lang} digits={digits} className="text-3xl font-semibold" />
          <span className="text-sm text-muted-foreground">{p.per}</span>
        </div>
        <ul className="grid gap-2.5">
          {p.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckIcon weight="bold" aria-hidden="true" className="size-4 shrink-0 text-success" />
              {bidi(f, lang)}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{p.cta}</Button>
      </CardFooter>
    </Card>
  );
}

const BADGES: Record<string, string | undefined> = {
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-info text-info-foreground',
};

function ControlsCard({ lang }: Props) {
  const c = T[lang].controls;
  const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'default'] as const;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{c.title}</CardTitle>
        <CardDescription>{c.desc}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {c.btns.map((label, i) => (
            <Button key={label} variant={variants[i]} disabled={i === 5}>
              {label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(c.badges as BadgeRow[]).map(([label, v]) => (
            <Badge key={v} variant={BADGES[v] ? 'default' : (v as 'default')} className={BADGES[v]}>
              {label}
            </Badge>
          ))}
        </div>
        <Button variant="outline" className="w-fit" onClick={() => showToast(T[lang].toast)}>
          <BellIcon data-icon="inline-start" />
          {c.toast}
        </Button>
      </CardContent>
    </Card>
  );
}

export function Examples({ lang }: Props) {
  return (
    <Masonry
      items={[
        <ProductCard key="product" lang={lang} />,
        <CartCard key="cart" lang={lang} />,
        <StatusCard key="status" lang={lang} />,
        <PaymentCard key="payment" lang={lang} />,
        <AccountCard key="account" lang={lang} />,
        <NotifyCard key="notify" lang={lang} />,
        <ReviewsCard key="reviews" lang={lang} />,
        <PlanCard key="plan" lang={lang} />,
        <ControlsCard key="controls" lang={lang} />,
      ]}
    />
  );
}
