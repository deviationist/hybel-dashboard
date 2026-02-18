import { useEffect, useRef } from "react";
import { type RentalUnit } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { daysUntil } from "@/lib/date";
import { FormattedDate } from "@/components/formatted-date";
import { formatAddress } from "@/lib/address";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { ChevronDown, Home, Send, Wrench } from "lucide-react";
import { paymentStatusConfig, unitStatusConfig } from "./status-config";

type UnitRowProps = {
  unit: RentalUnit;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
};

export function UnitRow({
  unit,
  isExpanded,
  isHighlighted,
  onToggle,
}: UnitRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isHighlighted]);

  const days = unit.contract?.leaseExpires
    ? daysUntil(unit.contract.leaseExpires)
    : null;

  return (
    <div ref={rowRef}>
      <Item
        className={cn(
          "cursor-pointer hover:bg-accent/50",
          isHighlighted && "ring-2 ring-primary/30 bg-primary/5",
        )}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${formatAddress(unit.address)}${unit.tenant ? `, tenant ${unit.tenant.name}` : `, ${unitStatusConfig[unit.status].label}`}`}
      >
        <ItemContent>
          <ItemTitle>
            <Home className="size-4 text-muted-foreground" />
            {formatAddress(unit.address)}
          </ItemTitle>
          <ItemDescription>
            {unit.tenant
              ? unit.tenant.name
              : unitStatusConfig[unit.status].label}
          </ItemDescription>
        </ItemContent>

        <ItemActions>
          {unit.contract ? (
            <>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                <Currency {...unit.contract.monthlyRent} />
                /mo
              </span>
              <Badge
                className={
                  paymentStatusConfig[unit.contract.paymentStatus].className
                }
              >
                {paymentStatusConfig[unit.contract.paymentStatus].label}
              </Badge>
            </>
          ) : (
            <Badge className={unitStatusConfig[unit.status].className}>
              {unitStatusConfig[unit.status].label}
            </Badge>
          )}
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
          />
        </ItemActions>
      </Item>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-4 space-y-3 border-t border-border/50 bg-muted/30">
            {unit.contract ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Rent</p>
                    <p className="font-medium">
                      <Currency {...unit.contract.monthlyRent} />
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lease Expires</p>
                    <p className="font-medium">
                      <FormattedDate date={unit.contract.leaseExpires} />
                      {days !== null && days <= 90 && (
                        <span className="text-amber-600 ml-1">({days}d)</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Status</p>
                    <Badge
                      className={cn(
                        "mt-0.5",
                        paymentStatusConfig[unit.contract.paymentStatus]
                          .className,
                      )}
                    >
                      {paymentStatusConfig[unit.contract.paymentStatus].label}
                    </Badge>
                  </div>
                </div>
                {unit.contract.paymentStatus === "overdue" && (
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Send className="size-3.5" />
                    Send payment reminder
                  </Button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="size-4" />
                {unit.status === "vacant"
                  ? "This unit is currently vacant and available for new tenants."
                  : "This unit is currently under maintenance."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
