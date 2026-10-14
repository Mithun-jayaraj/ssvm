import React, { createContext, useContext, useState, useEffect } from 'react';

const QuotationContext = createContext(null);

export const QuotationProvider = ({ children }) => {
  const [quotationItems, setQuotationItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ssvm_quote_tray');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ssvm_quote_tray', JSON.stringify(quotationItems));
    } catch (e) {
      console.warn('Failed to save quote tray to localStorage:', e);
    }
  }, [quotationItems]);

  const addToQuote = (product, quantity = 1, requirements = '') => {
    if (!product) return;

    setQuotationItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product === product._id || item.productCode === product.productCode
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          requirements: requirements || updated[existingIndex].requirements,
        };
        return updated;
      }

      return [
        ...prev,
        {
          product: product._id,
          productName: product.name,
          productCode: product.productCode,
          category: product.category?.name || '',
          material: product.material || '',
          dimensions: product.dimensions || '',
          image: product.primaryImage || product.imageGallery?.[0]?.url || '',
          quantity: Math.max(1, quantity),
          requirements: requirements || '',
        },
      ];
    });

    setIsDrawerOpen(true);
  };

  const removeFromQuote = (identifier) => {
    setQuotationItems((prev) =>
      prev.filter((item) => item.product !== identifier && item.productCode !== identifier)
    );
  };

  const updateQuantity = (identifier, newQty) => {
    const qty = Math.max(1, parseInt(newQty, 10) || 1);
    setQuotationItems((prev) =>
      prev.map((item) =>
        item.product === identifier || item.productCode === identifier
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const updateRequirements = (identifier, reqNotes) => {
    setQuotationItems((prev) =>
      prev.map((item) =>
        item.product === identifier || item.productCode === identifier
          ? { ...item, requirements: reqNotes }
          : item
      )
    );
  };

  const clearQuote = () => {
    setQuotationItems([]);
  };

  return (
    <QuotationContext.Provider
      value={{
        quotationItems,
        totalItemsCount: quotationItems.reduce((acc, item) => acc + item.quantity, 0),
        addToQuote,
        removeFromQuote,
        updateQuantity,
        updateRequirements,
        clearQuote,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

export const useQuotation = () => {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error('useQuotation must be used within a QuotationProvider');
  }
  return context;
};
