import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef, useEffect } from 'react';
import { X, Package, DollarSign, ChevronDown } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    product: string;
    brand: string;
    quantity: number;
    peso: number;
    value: number;
    date: string;
    description: string;
    duration: number;
  }) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    product: '',
    brand: 'Fabricante',
    caixas: '',
    peso: '',
    value: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fabricantes = [
    'Unilever', 'P&G', 'Gtex', 'Ypê', 'Start', 'Reckitt', 
    'SC Johnson', 'Bombril', 'Flora', 'GR Grupo', 'Super Globo', 'Dular', 'Alquimisa'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.product.trim()) {
      newErrors.product = 'Produto é obrigatório';
    }
    if (!formData.brand.trim() || formData.brand === 'Fabricante') {
      newErrors.brand = 'Fabricante é obrigatório';
    }
    if (!formData.caixas || Number(formData.caixas) <= 0) {
      newErrors.caixas = 'Caixas deve ser maior que 0';
    }
    if (!formData.peso || Number(formData.peso) <= 0) {
      newErrors.peso = 'Peso deve ser maior que 0';
    }
    if (!formData.value || Number(formData.value) <= 0) {
      newErrors.value = 'Preço unitário deve ser maior que 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onAdd({
      product: formData.product.trim(),
      brand: formData.brand.trim(),
      quantity: Number(formData.caixas),
      peso: Number(formData.peso),
      value: Number(formData.value),
      date: new Date().toISOString().split('T')[0],
      description: `${formData.caixas} caixas, ${formData.peso}kg`,
      duration: 45
    });

    // Reset form
    setFormData({
      product: '',
      brand: 'Fabricante',
      caixas: '',
      peso: '',
      value: ''
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        product: '',
        brand: 'Fabricante',
        caixas: '',
        peso: '',
        value: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-theme-secondary p-6 text-left align-middle shadow-xl transition-all border border-theme">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-lg font-bold text-theme-primary">
                    Adicionar Nova Tarefa
                  </Dialog.Title>
                  <button 
                    onClick={handleClose} 
                    disabled={isSubmitting} 
                    className="text-theme-secondary hover:text-theme-primary transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-theme-secondary mb-2">
                      <Package className="w-4 h-4" />
                      <span>Produto</span>
                    </label>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={formData.product} 
                        onChange={e => setFormData({
                          ...formData,
                          product: e.target.value
                        })} 
                        className="flex-1 px-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent" 
                        placeholder="Nome do produto" 
                        disabled={isSubmitting} 
                      />
                      <div className="relative min-w-[140px]" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          disabled={isSubmitting}
                          className="w-full h-10 px-3 py-2 bg-theme-primary border border-theme rounded-lg focus:outline-none focus:border-theme-accent appearance-none cursor-pointer text-sm text-left flex items-center justify-between"
                        >
                          <span className={formData.brand === 'Fabricante' ? 'text-theme-secondary' : 'text-theme-primary'}>
                            {formData.brand}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-theme-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-theme-primary border border-theme rounded-lg shadow-lg max-h-32 overflow-y-auto scrollbar-hide">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, brand: 'Fabricante' });
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-3 py-2 text-left text-theme-secondary hover:bg-theme-secondary-hover text-sm"
                            >
                              Fabricante
                            </button>
                            {fabricantes.map((fabricante) => (
                              <button
                                key={fabricante}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, brand: fabricante });
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-theme-primary hover:bg-theme-secondary-hover text-sm"
                              >
                                {fabricante}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.product && <p className="text-red-400 text-sm mt-1">{errors.product}</p>}
                    {errors.brand && <p className="text-red-400 text-sm mt-1">{errors.brand}</p>}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-theme-secondary mb-2">
                      <Package className="w-4 h-4" />
                      <span>Caixas</span>
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      value={formData.caixas} 
                      onChange={e => setFormData({
                        ...formData,
                        caixas: e.target.value
                      })} 
                      className="w-full px-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent" 
                      placeholder="Ex: 120" 
                      disabled={isSubmitting} 
                    />
                    {errors.caixas && <p className="text-red-400 text-sm mt-1">{errors.caixas}</p>}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-theme-secondary mb-2">
                      <Package className="w-4 h-4" />
                      <span>Peso (kg)</span>
                    </label>
                    <input 
                      type="number" 
                      min="0.1" 
                      step="0.1" 
                      value={formData.peso} 
                      onChange={e => setFormData({
                        ...formData,
                        peso: e.target.value
                      })} 
                      className="w-full px-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent" 
                      placeholder="Ex: 150.5" 
                      disabled={isSubmitting} 
                    />
                    {errors.peso && <p className="text-red-400 text-sm mt-1">{errors.peso}</p>}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-theme-secondary mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Preço Unitário</span>
                    </label>
                    <input 
                      type="number" 
                      min="0.01" 
                      step="0.01" 
                      value={formData.value} 
                      onChange={e => setFormData({
                        ...formData,
                        value: e.target.value
                      })} 
                      className="w-full px-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent" 
                      placeholder="Ex: R$ 15,98 por unidade" 
                      disabled={isSubmitting} 
                    />
                    {errors.value && <p className="text-red-400 text-sm mt-1">{errors.value}</p>}
                  </div>

                  

                  <div className="flex space-x-3 pt-4">
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      disabled={isSubmitting} 
                      className="flex-1 px-4 py-2 bg-theme-secondary-hover hover:bg-theme-border text-theme-primary rounded-lg transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="flex-1 px-4 py-2 bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-text rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-theme-accent-text/30 border-t-theme-accent-text rounded-full animate-spin" />
                          <span>Salvando...</span>
                        </>
                      ) : (
                        <span>Adicionar Tarefa</span>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
