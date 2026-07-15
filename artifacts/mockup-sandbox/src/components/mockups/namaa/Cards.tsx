import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";

// --- Icons ---
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.3333 6.66667V4.66667C11.3333 3.78261 10.9821 2.93477 10.357 2.30964C9.7319 1.68452 8.88406 1.33333 8 1.33333C7.11594 1.33333 6.2681 1.68452 5.64298 2.30964C5.01786 2.93477 4.66667 3.78261 4.66667 4.66667V6.66667M3.33333 6.66667H12.6667C13.403 6.66667 14 7.26362 14 8V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8C2 7.26362 2.59695 6.66667 3.33333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.3333 6.66667V4.66667C11.3333 3.78261 10.9821 2.93477 10.357 2.30964C9.7319 1.68452 8.88406 1.33333 8 1.33333C7.11594 1.33333 6.2681 1.68452 5.64298 2.30964C5.01786 2.93477 4.66667 3.78261 4.66667 4.66667M3.33333 6.66667H12.6667C13.403 6.66667 14 7.26362 14 8V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8C2 7.26362 2.59695 6.66667 3.33333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8C1 8 3.66667 2.66667 8 2.66667C12.3333 2.66667 15 8 15 8C15 8 12.3333 13.3333 8 13.3333C3.66667 13.3333 1 8 1 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReplaceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 2.66667V6H4.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 13.3333V10H11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.66 6.00001C13.2386 4.78912 12.4419 3.73887 11.3787 3.00346C10.3155 2.26804 9.04169 1.88647 7.74239 1.91418C6.44309 1.94189 5.18585 2.37731 4.15392 3.15545C3.12199 3.93358 2.37059 5.01358 2.01333 6.23334L1 6.00001M15 10C14.6427 11.2198 13.8913 12.2998 12.8594 13.0779C11.8275 13.856 10.5702 14.2915 9.27094 14.3192C7.97164 14.3469 6.69786 13.9653 5.63468 13.2299C4.5715 12.4945 3.77477 11.4442 3.35333 10.2333L4.36667 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.3333 4.66667L9.66667 10.3333L6.33333 7L1.33333 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.3333 4.66667H15.3333V8.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.3333 5.33333H2.66667C2.29848 5.33333 2 5.63181 2 6V8.66667C2 9.03486 2.29848 9.33333 2.66667 9.33333H13.3333C13.7015 9.33333 14 9.03486 14 8.66667V6C14 5.63181 13.7015 5.33333 13.3333 5.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33333 9.33333V13.3333C3.33333 13.7015 3.63181 14 4 14H12C12.3682 14 12.6667 13.7015 12.6667 13.3333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14V5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 5.33333H5.66667C5.07754 5.33333 4.51256 5.09928 4.09598 4.6827C3.6794 4.26612 3.44534 3.70114 3.44534 3.112C3.44534 2.52287 3.6794 1.95789 4.09598 1.54131C4.51256 1.12473 5.07754 0.890671 5.66667 0.890671C6.2558 0.890671 6.82078 1.12473 7.23736 1.54131C7.65394 1.95789 7.888 2.52287 7.888 3.112C7.888 3.8484 8 5.33333 8 5.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 5.33333H10.3333C10.9225 5.33333 11.4874 5.09928 11.904 4.6827C12.3206 4.26612 12.5547 3.70114 12.5547 3.112C12.5547 2.52287 12.3206 1.95789 11.904 1.54131C11.4874 1.12473 10.9225 0.890671 10.3333 0.890671C9.7442 0.890671 9.17922 1.12473 8.76264 1.54131C8.34606 1.95789 8.112 2.52287 8.112 3.112C8.112 3.8484 8 5.33333 8 5.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VisaIcon = () => (
  <svg width="40" height="13" viewBox="0 0 40 13" fill="none">
    <path d="M15.4057 0.222656L10.1557 12.2227H6.77242L4.05575 2.85599C3.90575 2.15599 3.78909 1.83932 3.32242 1.48932C2.45575 0.822656 1.15575 0.422656 0 0.222656L0.0833333 0.222656H5.72242C6.42242 0.222656 7.03909 0.70599 7.20575 1.52266L8.62242 8.52266L11.9724 0.222656H15.4057ZM29.2391 8.35599C29.2557 5.17266 24.8724 5.00599 24.8891 3.52266C24.9057 3.07266 25.3224 2.57266 26.3391 2.43932C26.8557 2.37266 28.0891 2.32266 29.2891 2.88932L29.7724 0.589323C29.1224 0.35599 28.2057 0.122656 26.9724 0.122656C23.7724 0.122656 21.4891 1.82266 21.4724 4.38932C21.4557 6.27266 23.1557 7.32266 24.3891 7.92266C25.6557 8.53932 26.0724 8.93932 26.0724 9.53932C26.0557 10.4393 24.9724 10.8393 24.0057 10.8559C22.4224 10.8893 21.4891 10.4227 20.7891 10.0893L20.2891 12.4559C20.9391 12.7559 22.1891 13.0227 23.5057 13.0393C26.9057 13.0393 29.2057 11.3559 29.2391 8.35599ZM38.1057 12.2227H41.2224L38.4891 0.222656H35.6391C35.0391 0.222656 34.5557 0.572656 34.3224 1.13932L29.3891 12.2227H32.8891C32.8891 12.2227 33.5891 10.2727 33.6891 10.0227C34.0891 10.0227 37.3391 10.0227 37.8224 10.0227C37.9224 10.4559 38.1057 12.2227 38.1057 12.2227ZM34.6224 7.42266C34.8891 6.67266 35.9891 3.53932 35.9891 3.53932C35.9557 3.55599 36.2557 2.70599 36.4057 2.27266L37.1391 5.73932C37.1391 5.73932 35.1557 7.42266 34.6224 7.42266ZM19.9224 0.222656H16.6391L13.5224 12.2227H16.8057L19.9224 0.222656Z" fill="currentColor"/>
  </svg>
);

const MadaIcon = () => (
  <svg width="40" height="15" viewBox="0 0 40 15" fill="none">
    <path d="M11.832 5.09635V14.5002H15.1119V3.13642L11.832 5.09635Z" fill="currentColor"/>
    <path d="M2.99222 5.09635V14.5002H6.27218V3.13642L2.99222 5.09635Z" fill="currentColor"/>
    <path d="M20.672 5.09635V14.5002H23.9519V3.13642L20.672 5.09635Z" fill="currentColor"/>
    <path d="M37.9405 14.5002C39.0205 14.5002 39.896 13.6247 39.896 12.5446C39.896 11.4646 39.0205 10.5891 37.9405 10.5891C36.8604 10.5891 35.9849 11.4646 35.9849 12.5446C35.9849 13.6247 36.8604 14.5002 37.9405 14.5002Z" fill="currentColor"/>
    <path d="M30.6301 5.09635V14.5002H33.9101V3.13642L30.6301 5.09635Z" fill="currentColor"/>
    <path d="M15.1118 4.26901L13.4719 3.28906V0.5H10.1919V5.25301L15.1118 8.19289V4.26901Z" fill="currentColor"/>
    <path d="M23.9517 4.26901L22.3118 3.28906V0.5H19.0318V5.25301L23.9517 8.19289V4.26901Z" fill="currentColor"/>
    <path d="M33.9099 4.26901L32.2699 3.28906V0.5H28.9899V5.25301L33.9099 8.19289V4.26901Z" fill="currentColor"/>
    <path d="M6.27191 4.26901L4.63198 3.28906V0.5H1.352V5.25301L6.27191 8.19289V4.26901Z" fill="currentColor"/>
  </svg>
)

// --- Mock Data ---
const CARDS = [
  {
    id: "card-1",
    type: "Platinum",
    network: "Visa",
    number: "•••• •••• •••• 8245",
    expiry: "09/27",
    limit: 25000,
    available: 18450,
    outstanding: 6550,
    locked: false,
    theme: "green"
  },
  {
    id: "card-2",
    type: "Signature",
    network: "Visa",
    number: "•••• •••• •••• 4091",
    expiry: "11/26",
    limit: 75000,
    available: 72100,
    outstanding: 2900,
    locked: false,
    theme: "dark"
  },
  {
    id: "card-3",
    type: "Mada Debit",
    network: "Mada",
    number: "•••• •••• •••• 1158",
    expiry: "02/25",
    limit: 0,
    available: 12500,
    outstanding: 0,
    locked: true,
    theme: "locked"
  }
];

const TRANSACTIONS = [
  { id: 1, merchant: "Apple Store", date: "Today, 14:32", amount: -4500, category: "Electronics" },
  { id: 2, merchant: "STC Pay", date: "Yesterday, 09:15", amount: -500, category: "Transfer" },
  { id: 3, merchant: "Starbucks", date: "Yesterday, 08:45", amount: -25, category: "Food & Beverage" },
  { id: 4, merchant: "Payment - Thank You", date: "Oct 12, 11:00", amount: 2000, category: "Payment" },
  { id: 5, merchant: "Uber", date: "Oct 11, 22:14", amount: -65, category: "Transportation" },
  { id: 6, merchant: "Jarir Bookstore", date: "Oct 10, 16:20", amount: -320, category: "Shopping" },
];

export function Cards() {
  const [selectedCardId, setSelectedCardId] = useState(CARDS[0].id);

  const selectedCard = CARDS.find(c => c.id === selectedCardId) || CARDS[0];

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat("en-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(absAmount);
    
    return isNegative ? `- ${formatted}` : `+ ${formatted}`;
  };

  const utilization = selectedCard.limit > 0 
    ? (selectedCard.outstanding / selectedCard.limit) * 100 
    : 0;

  return (
    <AppLayout activePage="cards">
      <div className="max-w-[1080px] mx-auto p-8 pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">My Cards</h1>
            <p className="text-sm text-gray-500">Manage your physical and digital cards</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <PlusIcon />
            Add New Card
          </button>
        </div>

        {/* Top Section: Card Visuals */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar mb-4">
          {CARDS.map((card) => {
            const isSelected = selectedCardId === card.id;
            
            // Themes
            const themes = {
              green: "bg-gradient-to-br from-[#00703C] to-[#004A27] text-white border-transparent",
              dark: "bg-gradient-to-br from-[#1F2937] to-[#111827] text-white border-transparent",
              locked: "bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] text-gray-500 border-gray-200"
            };

            const themeClass = themes[card.theme as keyof typeof themes];

            return (
              <div 
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`snap-center shrink-0 w-[320px] h-[200px] rounded-2xl p-6 relative cursor-pointer transition-all duration-300 border ${themeClass} ${
                  isSelected ? "ring-2 ring-offset-4 ring-[#00703C] shadow-lg transform scale-[1.02]" : "opacity-70 hover:opacity-100 hover:-translate-y-1 shadow-sm"
                }`}
                style={card.locked ? { filter: isSelected ? "none" : "grayscale(100%)" } : {}}
              >
                {card.locked && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-2xl z-10 flex items-center justify-center">
                    <div className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5">
                      <LockIcon /> Locked
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-10 relative z-0">
                  <div className="font-semibold tracking-wide text-sm opacity-90 uppercase">{card.type}</div>
                  <div className="opacity-80">
                    {card.network === "Visa" ? <VisaIcon /> : <MadaIcon />}
                  </div>
                </div>

                <div className="font-mono text-xl tracking-widest mb-6 relative z-0 opacity-90">
                  {card.number}
                </div>

                <div className="flex justify-between items-end relative z-0">
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-wider mb-0.5">Card Holder</div>
                    <div className="font-medium text-sm tracking-wide">SALEH ALHARBI</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase tracking-wider mb-0.5 text-right">Valid Thru</div>
                    <div className="font-medium text-sm font-mono">{card.expiry}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Limit & Usage */}
            {selectedCard.limit > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Available Balance</div>
                    <div className="text-3xl font-semibold text-gray-900 tracking-tight">
                      SAR {selectedCard.available.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500 mb-1">Outstanding</div>
                    <div className="text-lg font-medium text-gray-900">
                      SAR {selectedCard.outstanding.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>Usage ({Math.round(utilization)}%)</span>
                    <span>Total Limit: SAR {selectedCard.limit.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00703C] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedCard.limit === 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                 <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Account Balance</div>
                    <div className="text-3xl font-semibold text-gray-900 tracking-tight">
                      SAR {selectedCard.available.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Linked to Current Account ending in 8892</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-200 hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedCard.locked ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600'}`}>
                  {selectedCard.locked ? <UnlockIcon /> : <LockIcon />}
                </div>
                <span className="text-xs font-medium text-gray-700">{selectedCard.locked ? 'Unlock Card' : 'Freeze Card'}</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                  <EyeIcon />
                </div>
                <span className="text-xs font-medium text-gray-700">View PIN</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                  <ReplaceIcon />
                </div>
                <span className="text-xs font-medium text-gray-700">Replace</span>
              </button>

              <button 
                className="flex flex-col items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedCard.network === 'Mada'}
              >
                <div className="w-10 h-10 rounded-full bg-[#00703C]/10 flex items-center justify-center text-[#00703C]">
                  <TrendUpIcon />
                </div>
                <span className="text-xs font-medium text-gray-700">Increase Limit</span>
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-[#00703C] to-[#004A27] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
              {/* Abstract pattern */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <GiftIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Alinma Rewards</h3>
                  <p className="text-white/80 text-sm">Earn points on every purchase</p>
                </div>
              </div>
              
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <div className="text-3xl font-bold tracking-tight mb-1">2,340 <span className="text-lg font-medium text-white/80">pts</span></div>
                  <div className="text-xs text-white/70">Expiring in 60 days: 0 pts</div>
                </div>
                <button className="bg-white text-[#00703C] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                  Redeem
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Transactions */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-sm font-medium text-[#00703C] hover:text-[#005a30]">View All</button>
              </div>
              
              <div className="flex-1 p-2">
                {selectedCard.locked ? (
                   <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
                     <LockIcon />
                     <p className="mt-4 text-sm font-medium text-gray-600">Card is currently locked</p>
                     <p className="text-xs mt-1">Unlock your card to view recent activity.</p>
                   </div>
                ) : (
                  <div className="space-y-1">
                    {TRANSACTIONS.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {tx.amount > 0 ? (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{tx.merchant}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{tx.date} • {tx.category}</div>
                          </div>
                        </div>
                        <div className={`font-semibold text-sm ${tx.amount > 0 ? 'text-[#00703C]' : 'text-gray-900'}`}>
                          {formatCurrency(tx.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AppLayout>
  );
}
