"use client"
import { useEffect, useRef } from "react";
import { clsx } from "clsx";

export const BubbleText = ({ children, className }: { children: string, className: string }) => {
    const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);

    useEffect(() => {
        const spans = document.querySelectorAll(".hover-text span") as NodeListOf<HTMLSpanElement>;

        spanRefs.current = Array.from(spans);

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < spanRefs.current.length) {
                const span = spanRefs.current[currentIndex];
                triggerHover(span);
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const triggerHover = (span: HTMLSpanElement | null) => {
        if (span) {
            spanRefs.current.forEach((s) => {
                if (s) {
                    s.style.transform = "scale(1)";
                    /* s.style.fontWeight = "800"; */
                    s.style.color = "rgb(255, 255, 255)";
                }
            });

            span.style.transform = "scale(1.2)";
            span.style.color = "rgb(199, 210, 254)";
/*             span.style.fontWeight = "900";
 */            const leftNeighbor = span.previousElementSibling as HTMLSpanElement | null;
            const rightNeighbor = span.nextElementSibling as HTMLSpanElement | null;
            if (leftNeighbor) {
                leftNeighbor.style.transform = "scale(1.1)";
                leftNeighbor.style.color = "rgb(199, 210, 255)";
/*                 leftNeighbor.style.fontWeight = "900";
 */            }
            if (rightNeighbor) {
                rightNeighbor.style.transform = "scale(1.1)";
                rightNeighbor.style.color = "rgb(199, 210, 255)";
/*                 rightNeighbor.style.fontWeight = "900";
 */            }
            setTimeout(() => {
                span.style.transform = "scale(1)";
                span.style.color = "rgb(255, 255, 255)";
                if (leftNeighbor) {
                    leftNeighbor.style.transform = "scale(1)";
                    leftNeighbor.style.color = "rgb(255, 255, 255)";
                }
                if (rightNeighbor) {
                    rightNeighbor.style.transform = "scale(1)";
                    rightNeighbor.style.color = "rgb(255, 255, 255)";
                }
            }, 10000); // Adjust the reset timeout as needed
        }
    };

    return (
        <h2 className={clsx('hover-text', className)}>
            <Text>{children}</Text>
        </h2>
    );
};

// Adjusted Text component
const Text = ({ children }: { children: string }) => {
    return (
        <>
           {children.split("").map((child, idx) => (
                <span
                    style={{
                        transition: "0.2s transform, 0.2s color, 0.35s font-weight",
                        display: "inline-block",
                        whiteSpace: "pre",
                    }}
                    className=""
                    key={idx}
                >
                    {child}
                </span>
            ))}
        </>
    );
};
