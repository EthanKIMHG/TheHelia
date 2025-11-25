"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  question: { ko: string; en: string };
  answer: { ko: string; en: string };
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: {
      ko: "신생아 및 보호자 감염 관리는 어떻게 되나요?",
      en: "How is infection control managed for newborns and guardians?",
    },
    answer: {
      ko: `∙ 신생아 : 입실 당일 사전관찰실에서 일정 시간 격리 관찰합니다.
로타 바이러스 키트로 검사 후 음성 반응 확인한 이후 신생아실로 입실하며 양성 반응이 나올 경우 입소가 취소됩니다.

∙ 보호자 : 입소 당일 코로나19 자가진단 키트 검사 실시하여 음성 반응 확인 후 입실합니다. 양성 반응이 나올 경우 입실이 취소됩니다.`,
      en: `∙ Newborns: On the day of admission, they are observed in isolation in the pre-observation room for a certain period.
After testing negative with a Rotavirus kit, they enter the nursery. Admission will be cancelled if the test result is positive.

∙ Guardians: On the day of admission, a COVID-19 self-test kit is used. Admission is allowed only after a negative result is confirmed. Admission will be cancelled if the test result is positive.`,
    },
  },
  {
    question: {
      ko: "보호자 출입 가능 시간은?",
      en: "What are the visiting hours for guardians?",
    },
    answer: {
      ko: "∙ 보호자 지문 등록 이후 24시간 자유롭게 입출입이 가능합니다.",
      en: "∙ After registering your fingerprint, guardians can enter and exit freely 24 hours a day.",
    },
  },
  {
    question: {
      ko: "상담 후 계약금과 환불 규정은?",
      en: "What are the deposit and refund policies?",
    },
    answer: {
      ko: `∙ 계약금은 전체 이용 금액의 10% 이며 환불 규정은 아래와 같습니다.

- 출산예정일 31일 이상 또는 계약 후 24시간 이내 : 계약금 전액환불
- 출산예정일 21일~30일 이전 : 계약금의 60% 환불
- 출산예정일 10일~20일 이전 : 계약금의 30% 환불
- 출산예정일 9일 이전 : 계약금 환불불가

대기 미해제로 인한 환불의 경우, 기간에 따른 위약금 없이 전액 환불해드립니다.`,
      en: `∙ The deposit is 10% of the total service fee, and the refund policy is as follows:

- 31 days or more before the due date or within 24 hours of contract: Full refund of deposit
- 21-30 days before the due date: 60% refund of deposit
- 10-20 days before the due date: 30% refund of deposit
- 9 days or less before the due date: No refund of deposit

In case of a refund due to non-release of the waiting list, a full refund will be made without any penalty regardless of the period.`,
    },
  },
  {
    question: {
      ko: "가족면회 가능한가요?",
      en: "Are family visits allowed?",
    },
    answer: {
      ko: "∙ 산모님과 신생아의 전염성 감염 예방을 위해 산후조리원 내 외부인 면회는 제한됩니다.",
      en: "∙ To prevent infectious diseases for mothers and newborns, visits by outsiders within the postpartum care center are restricted.",
    },
  },
  {
    question: {
      ko: "어떤 물품이 제공되나요?",
      en: "What items are provided?",
    },
    answer: {
      ko: `∙ 객실 및 공용공간 
: 산모복, 수유쿠션, 회음부방석, 객실용 슬리퍼, 보호자 생활복, 보호자 슬리퍼, 크리넥스 티슈, 수건, 발수건 (*산모복/수건은 매일 제공)
메델라 심포니/락티나 유축기, 폴레드 픽셀 젖병소독기, 공기청정기, 공기살균기, 드라이기, 스타일러, 정수기, 냉장고, 좌욕기

∙ 웰컴 기프트 (1회 제공) 
: 몰튼 브라운 4종 세트(샴푸, 컨디셔너, 바디워시, 비누), 물티슈, Wow생리대, 베이비 힙클렌저, 호두강정, 머그컵 
(*입실 기프트 구성항목은 재고 현황에 따라 상이할 수 있음)`,
      en: `∙ Rooms & Common Areas
: Mother's wear, nursing cushion, perineal cushion, room slippers, guardian's wear, guardian's slippers, Kleenex tissues, towels, bath mats (*Mother's wear/towels provided daily)
Medela Symphony/Lactina breast pump, Poled Pixel bottle sterilizer, air purifier, air sterilizer, hair dryer, Styler, water purifier, refrigerator, sitz bath

∙ Welcome Gift (Provided once)
: Molton Brown 4-piece set (shampoo, conditioner, body wash, soap), wet wipes, Wow sanitary pads, baby hip cleanser, walnut gangjeong, mug cup
(*Welcome gift items may vary depending on stock availability)`,
    },
  },
  {
    question: {
      ko: "개인 준비 물품은 어떤게 있나요?",
      en: "What personal items do I need to bring?",
    },
    answer: {
      ko: `∙ 퇴실일에 필요한 신생아 물품 
: 속싸개, 겉싸개, 배냇저고리, 카시트 (*입실기간 동안 신생아실에서 사용되는 신생아 관련 물품은 산후조리원에서 제공)

∙ 객실 제공 물품을 제외한 개별 필요 용품 
: 개인 화장품(치약 및 칫솔 포함), 속옷 및 양말(고온 물 세탁 가능 제품), 수유브라, 마스크(1일 1매 권장)`,
      en: `∙ Newborn items needed on discharge day
: Swaddle, outer wrap, baby undershirt, car seat (*Newborn items used in the nursery during the stay are provided by the center)

∙ Personal items excluding those provided in the room
: Personal toiletries (including toothpaste and toothbrush), underwear and socks (high-temperature washable), nursing bra, masks (1 per day recommended)`,
    },
  },
  {
    question: {
      ko: "산후조리원으로 택배 수령이 가능한가요?",
      en: "Can I receive parcels at the postpartum care center?",
    },
    answer: {
      ko: `∙ 수령 가능합니다. (꽃바구니 제외) 수령인 이름에 객실 번호를 기재해주세요.
∙ 다만 물품 분실에 대한 책임은 수령인 본인에게 있습니다.`,
      en: `∙ Yes, you can receive parcels. (Except for flower baskets) Please include your room number in the recipient's name.
∙ However, the recipient is responsible for any loss of items.`,
    },
  },
  {
    question: {
      ko: "산후조리원 비용 잔금 결제는 언제 하나요?",
      en: "When do I pay the remaining balance?",
    },
    answer: {
      ko: "∙ 입실 당일 계약금 제외한 나머지 금액 결제가 진행됩니다.",
      en: "∙ The remaining balance, excluding the deposit, is paid on the day of admission.",
    },
  },
  {
    question: {
      ko: "첫만남 이용권 및 지역화폐로 결제가 가능한가요?",
      en: "Can I pay with the First Meeting Voucher or local currency?",
    },
    answer: {
      ko: "∙ 네 가능합니다. 수원페이 이외에도 ‘산후조리비 지원’으로 제공되는 경기지역화폐라면 사용 가능합니다.",
      en: "∙ Yes, it is possible. In addition to Suwon Pay, Gyeonggi Local Currency provided as 'Postpartum Care Support' can be used.",
    },
  },
  {
    question: {
      ko: "산전 서비스를 산후 서비스로 변경할 수 있나요?",
      en: "Can I change prenatal services to postpartum services?",
    },
    answer: {
      ko: "∙ 조산 또는 해외 거주 등의 이유로 산전서비스를 받을 수 없는 경우에 한하여 증빙서류 제출 시 산전 서비스를 산후 서비스로 대체해드립니다.",
      en: "∙ Only in cases where prenatal services cannot be received due to premature birth or overseas residence, we will replace prenatal services with postpartum services upon submission of supporting documents.",
    },
  },
  {
    question: {
      ko: "그 외 질문사항",
      en: "Other Inquiries",
    },
    answer: {
      ko: `∙ 전화 상담 문의 : T.010-5077-3962
∙ 카톡 상담 문의 : THEHELIA`,
      en: `∙ Phone Inquiry : T.010-5077-3962
∙ KakaoTalk Inquiry : THEHELIA`,
    },
  },
];

export function FaqPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#2A2928]/40 rounded-2xl border border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-foreground pr-8">
                    {isKo ? item.question.ko : item.question.en}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-primary/10 mb-6" />
                        <p className="text-secondary/80 leading-relaxed whitespace-pre-line">
                          {isKo ? item.answer.ko : item.answer.en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}
