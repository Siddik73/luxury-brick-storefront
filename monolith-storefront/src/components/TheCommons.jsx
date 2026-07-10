/**
 * @file TheCommons.jsx
 * @description "The Commons — Dhaka Exchange" (Protocols • 05). Bulk brick
 * quotation section converted from the Google Stitch export: quantity
 * configurator with grade selection and live indicative pricing (BDT),
 * verified supplier strip, and a quotation inquiry form wired to Web3Forms.
 * Quotation inquiry only — no payment processing.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal.jsx';
import { SECTION_IDS } from '../utils/constants.js';
import { SUPPLIERS } from '../data/suppliers.js';

// ---------------------------------------------------------------------------
// PLACEHOLDER PRICING — indicative BDT ranges per 1,000 bricks ("hazar").
// These are NOT real market figures. Replace with verified supplier pricing
// before launch; the UI already labels them "INDICATIVE RANGE".
// ---------------------------------------------------------------------------
const BRICK_GRADES = [
  {
    id: 'first-class',
    label: '1st Class (Grade A)',
    desc: 'High structural integrity. Uniform color & shape.',
    pricePerHazar: [12000, 14500],
  },
  {
    id: 'picked-jhama',
    label: 'Picked Jhama',
    desc: 'Over-burnt, extreme hardness. Irregular shape.',
    pricePerHazar: [13500, 16000],
  },
  {
    id: 'second-class',
    label: '2nd Class',
    desc: 'Slight edge chips. Standard load-bearing builds.',
    pricePerHazar: [9500, 12000],
  },
];

const DISTRICTS = [
  'Dhaka', 'Gazipur', 'Narayanganj', 'Chattogram', 'Sylhet', 'Rajshahi',
  'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Cumilla', 'Narsingdi',
];

const QTY_MIN = 1000;
const QTY_MAX = 100000;
const QTY_STEP = 1000;

/** Format a BDT amount with the ৳ sign and en-IN digit grouping. */
function formatBDT(amount) {
  return `৳${amount.toLocaleString('en-IN')}`;
}

/**
 * The Commons section component (bulk exchange configurator + inquiry form).
 * @returns {React.ReactElement} The rendered section.
 */
export default function TheCommons() {
  const [quantity, setQuantity] = useState(10000);
  const [grade, setGrade] = useState(BRICK_GRADES[0]);

  // Inquiry form state
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [priceLow, priceHigh] = useMemo(() => {
    const units = quantity / 1000;
    return [units * grade.pricePerHazar[0], units * grade.pricePerHazar[1]];
  }, [quantity, grade]);

  const adjustQuantity = (delta) => {
    setQuantity((current) => Math.min(QTY_MAX, Math.max(QTY_MIN, current + delta)));
  };

  const validate = () => {
    const errors = {};
    if (!businessName.trim()) {
      errors.businessName = 'Business or project name is required.';
    }
    // Bangladeshi mobile: +880 then 1X-XXXXXXXX (operator prefix 13–19)
    if (!/^1[3-9]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Enter a valid number: 1XXXXXXXXX (10 digits after +880).';
    }
    if (!district) {
      errors.district = 'Select a delivery district.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus('error');
      setErrorMessage(
        'Transmission channel not configured. Set VITE_WEB3FORMS_KEY in .env (get a free key at web3forms.com).'
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `The Commons — Quotation Request (${quantity.toLocaleString('en-IN')} pcs)`,
          from_name: 'The Monolith — The Commons',
          business_name: businessName.trim(),
          phone: `+880${phone.replace(/[\s-]/g, '')}`,
          delivery_district: district,
          volume: `${quantity.toLocaleString('en-IN')} pcs`,
          grade: grade.label,
          indicative_range: `${formatBDT(priceLow)} – ${formatBDT(priceHigh)}`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'The exchange declined the transmission.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Transmission failed. Check your connection and retry.');
    }
  };

  return (
    <section
      id={SECTION_IDS.COMMONS}
      className="relative w-full border-t border-ash/20 bg-void px-5 py-32 md:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section kicker */}
        <span className="mb-10 block font-mono text-xs uppercase tracking-[0.3em] text-ash">
          Protocols &bull; 05
        </span>

        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <TextReveal
            as="h2"
            className="mb-6 font-serif text-4xl font-normal leading-tight text-bone md:text-7xl"
          >
            The Commons.
          </TextReveal>
          <p className="mb-8 font-serif text-xl italic leading-relaxed text-ash">
            One brick is a statement. Ten thousand build a home.
          </p>
          <div className="inline-block border border-ash/20 bg-onyx px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              Local Exchange &bull; Bangladesh
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: configurator + suppliers */}
          <div className="flex flex-col gap-12 lg:col-span-8">
            {/* Quantity configurator */}
            <div className="border border-ash/20 bg-onyx p-8 md:p-12">
              <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ash/10 pb-8 md:flex-row md:items-end">
                <div>
                  <h3 className="mb-2 font-serif text-2xl text-bone">Quantity Configuration</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-ash">
                    Units of 1,000 bricks (hazar / হাজার)
                  </p>
                </div>

                {/* Stepper */}
                <div className="flex items-stretch border border-bone/40">
                  <button
                    type="button"
                    onClick={() => adjustQuantity(-QTY_STEP)}
                    disabled={quantity <= QTY_MIN}
                    aria-label="Decrease quantity by one thousand"
                    className="magnetic min-h-[44px] touch-manipulation px-6 font-mono text-xl text-bone transition-colors duration-300 hover:bg-bone hover:text-void disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bone"
                  >
                    &minus;
                  </button>
                  <div
                    aria-live="polite"
                    className="flex min-h-[44px] w-32 items-center justify-center border-x border-bone/40 font-mono text-lg text-bone"
                  >
                    {quantity.toLocaleString('en-IN')}
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustQuantity(QTY_STEP)}
                    disabled={quantity >= QTY_MAX}
                    aria-label="Increase quantity by one thousand"
                    className="magnetic min-h-[44px] touch-manipulation px-6 font-mono text-xl text-bone transition-colors duration-300 hover:bg-bone hover:text-void disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bone"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Grade selector */}
              <fieldset className="mb-12">
                <legend className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-ash">
                  Select Grade
                </legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {BRICK_GRADES.map((option) => (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="brick_grade"
                        className="peer sr-only"
                        checked={grade.id === option.id}
                        onChange={() => setGrade(option)}
                      />
                      <div className="relative flex h-full min-h-[44px] flex-col border border-ash/20 bg-void p-5 transition-colors duration-300 hover:border-ash peer-checked:border-ember peer-checked:bg-ember/5 peer-focus-visible:border-bone">
                        <span className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-bone">
                          {option.label}
                        </span>
                        <span className="font-mono text-[10px] leading-relaxed text-ash">
                          {option.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Live indicative price */}
              <div className="flex flex-col items-start border-t border-ash/10 pt-8">
                <span className="mb-2 font-mono text-xs uppercase tracking-widest text-ash">
                  Estimated Exchange Value
                </span>
                <div className="mb-2 font-mono text-3xl tracking-tight text-bone md:text-5xl">
                  {formatBDT(priceLow)} <span className="text-ash">&ndash;</span> {formatBDT(priceHigh)}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  Indicative range &mdash; final price on quotation
                </span>
              </div>
            </div>

            {/* Supplier strip */}
            <div>
              <div className="mb-6 flex items-end justify-between border-b border-ash/10 pb-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-ash">
                  Verified Exchange Network
                </h3>
                {/* Swipe affordance — mobile carousel only */}
                <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-gold md:hidden">
                  Swipe <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
              <div className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-col md:snap-none md:overflow-visible">
                {SUPPLIERS.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="group flex w-[85vw] max-w-[420px] shrink-0 touch-manipulation snap-start flex-col border border-ash/20 bg-onyx transition-colors duration-300 hover:border-ash md:w-auto md:max-w-none md:flex-row md:items-stretch"
                  >
                    {/* Photograph — fills the space the avatar square used to take.
                        overflow-hidden contains the hover scale; the district pill
                        is a sibling of the img so it stays fixed as UI overlay. */}
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-ash/20 bg-void md:aspect-auto md:w-40 md:border-b-0 md:border-r lg:w-56">
                      <img
                        src={supplier.image}
                        alt={supplier.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-[transform,filter] duration-300 ease-out group-hover:scale-[1.05] group-hover:brightness-105 group-active:scale-[1.03] group-active:brightness-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100"
                      />
                      <span className="absolute left-3 top-3 border border-ash/40 bg-void px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-bone">
                        {supplier.district}
                      </span>
                    </div>

                    <div className="flex min-h-[44px] flex-1 flex-col justify-between gap-4 p-6 md:flex-row md:items-center md:gap-5 md:p-5 lg:gap-6 lg:p-6">
                      <div>
                        <h4 className="font-sans text-lg text-bone">{supplier.name}</h4>
                        <p className="mt-1 max-w-md font-sans text-xs leading-relaxed text-ash/70">
                          {supplier.specialty}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                            {supplier.district}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-ash" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                            {supplier.radius}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-ash" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                            Capacity: {supplier.capacity}
                          </span>
                        </div>
                      </div>
                      <span className="self-start whitespace-nowrap bg-gold px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-void md:self-start lg:self-center">
                        Verified Stockist
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: inquiry form */}
          <div className="lg:col-span-4">
            <div className="border border-ash/20 bg-onyx p-8 lg:sticky lg:top-32">
              <h3 className="mb-8 border-b border-ash/10 pb-4 font-serif text-2xl text-bone">
                Initiate Protocol
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 py-8 text-center"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                      Transmission Sealed
                    </span>
                    <p className="font-serif text-xl italic leading-relaxed text-bone">
                      Your request has entered the ledger.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
                      A broker responds within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={false}
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="commons-business"
                        className="font-mono text-[10px] uppercase tracking-widest text-ash"
                      >
                        Business / Project Name
                      </label>
                      <input
                        id="commons-business"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Structure Design Co."
                        className="min-h-[44px] w-full touch-manipulation border-b border-ash/40 bg-transparent py-2 font-sans text-base text-bone outline-none transition-colors duration-300 placeholder:text-ash/30 focus:border-bone"
                      />
                      {fieldErrors.businessName && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ember">
                          {fieldErrors.businessName}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="commons-phone"
                        className="font-mono text-[10px] uppercase tracking-widest text-ash"
                      >
                        Phone
                      </label>
                      <div className="flex items-stretch">
                        <span className="flex min-h-[44px] items-center border-b border-ash/40 pr-3 font-mono text-base text-ash">
                          +880
                        </span>
                        <input
                          id="commons-phone"
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ''))}
                          placeholder="1XXXXXXXXX"
                          className="min-h-[44px] w-full touch-manipulation border-b border-ash/40 bg-transparent py-2 font-mono text-base text-bone outline-none transition-colors duration-300 placeholder:text-ash/30 focus:border-bone"
                        />
                      </div>
                      {fieldErrors.phone && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ember">
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="commons-district"
                        className="font-mono text-[10px] uppercase tracking-widest text-ash"
                      >
                        Delivery District
                      </label>
                      <select
                        id="commons-district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="min-h-[44px] w-full touch-manipulation border-b border-ash/40 bg-transparent py-2 font-mono text-sm uppercase text-bone outline-none transition-colors duration-300 focus:border-bone [&>option]:bg-onyx [&>option]:text-bone"
                      >
                        <option value="" disabled>
                          Select delivery district
                        </option>
                        {DISTRICTS.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.district && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ember">
                          {fieldErrors.district}
                        </span>
                      )}
                    </div>

                    {/* Auto-filled configurator summary */}
                    <div className="mt-2 border border-ash/20 bg-void p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                          Volume
                        </span>
                        <span className="font-mono text-sm text-bone">
                          {quantity.toLocaleString('en-IN')} pcs
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                          Grade
                        </span>
                        <span className="font-mono text-sm text-bone">{grade.label}</span>
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="border border-ember/40 bg-ember/5 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed text-ember">
                          {errorMessage}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="magnetic mt-2 min-h-[56px] w-full touch-manipulation bg-ember px-6 py-4 font-sans text-xs uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-bone hover:text-void active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === 'submitting' ? 'Transmitting…' : 'Request Quotation'}
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest opacity-70">
                        Response within 48 hours
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-20 flex flex-col items-center justify-center gap-4 border-t border-ash/10 pt-8 font-mono text-[10px] uppercase tracking-widest text-ash/60 md:flex-row md:gap-12">
          <span>Eco-block compliant</span>
          <span className="hidden h-4 w-px bg-ash/20 md:block" />
          <span>Govt. standard grading</span>
          <span className="hidden h-4 w-px bg-ash/20 md:block" />
          <span>Bulk delivery</span>
        </div>
      </div>
    </section>
  );
}
