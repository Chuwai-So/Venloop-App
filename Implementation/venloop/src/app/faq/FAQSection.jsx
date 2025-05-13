'use client';

import { useState } from "react";

const faqData = [
    {
        question: "Waar en wanneer speel ik de opdrachten?",
        answer: "Dag 1: zodra je op Egypte loopt.\nDag 2: zodra je op de pauzeplek bent\nDag 3: zodra je op de pauzeplek bent\nDag 4: op de startlocatie"
    },
    {
        question: "Kan ik per school met meerdere mensen spelen?",
        answer: "Nee, per school is er één account mogelijk die het spel speelt. Mocht deze persoon een dag niet aanwezig zijn, kan de beheerdersrol worden overgedragen. Het spel wordt dus gespeeld per school."
    },
    {
        question: "Hoeveel opdrachten zijn er per dag?",
        answer: "Er is één opdracht / vraag per dag."
    },
    {
        question: "Zit er een competitief element in?",
        answer: "Meedoen is belangrijker dan winnen."
    },
    {
        question: "Is het nog mogelijk om een antwoord aan te passen?",
        answer: "Nee, antwoorden kunnen niet meer gewijzigd worden. Denk dus goed na voordat je iets invult."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Veelgestelde Vragen</h2>

            <div className="flex flex-col gap-4">
                {faqData.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`transition-all duration-300 ease-in-out rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer border-l-4 ${isOpen ? 'border-orange-500' : 'border-gray-300'} bg-white`}
                            onClick={() => toggle(index)}
                        >
                            <div className="flex justify-between items-center px-5 py-4">
                                <h3 className="text-lg font-semibold text-black">{item.question}</h3>
                                <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : 'text-gray-500'}`}>
                  ▼
                </span>
                            </div>

                            <div
                                className={`px-5 text-gray-700 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] py-2' : 'max-h-0 py-0'} overflow-hidden whitespace-pre-line`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
