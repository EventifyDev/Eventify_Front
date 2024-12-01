import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Pencil, Trash2, Search, FileSpreadsheet, FileText } from 'lucide-react';
import { Participant } from '../types/participant.type';
import { ParticipantService } from '../services/participant.service';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Modal } from '../components/Modal';
import { EditParticipantForm } from '../components/EditParticipantForm';

const ParticipantsList = () => {
    const { event_id } = useParams();
    const participantService = new ParticipantService();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        fetchParticipants();
    }, [event_id]);

    const fetchParticipants = async () => {
        if (!event_id) return;

        setIsLoading(true);
        try {
            const data = await participantService.getEventParticipants(event_id);
            setParticipants(data);
        } catch (error) {
            toast.error('Aucun participant existe');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredParticipants = participants.filter(participant =>
        participant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (participant: Participant) => {
        setSelectedParticipant(participant);
        setIsEditModalOpen(true);
    };

    const handleConfirmEdit = async (data: Partial<Participant>) => {
        if (!selectedParticipant) return;

        setIsEditing(true);
        try {
            await participantService.update(selectedParticipant._id.toString(), data);
            toast.success('Participant updated successfully');
            fetchParticipants();
        } catch (error) {
            console.error('Error updating participant:', error);
            toast.error('Failed to update participant');
        } finally {
            setIsEditing(false);
            setIsEditModalOpen(false);
            setSelectedParticipant(null);
        }
    };

    const handleDeleteClick = (participantId: number) => {
        setSelectedParticipantId(participantId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedParticipantId) return;

        setIsDeleting(true);
        try {
            await participantService.cancelParticipation(selectedParticipantId.toString());
            toast.success('Participant removed successfully');
            fetchParticipants();
        } catch (error) {
            console.error('Error removing participant:', error);
            toast.error('Failed to remove participant');
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
            setSelectedParticipantId(null);
        }
    };

    const handleExportPDF = () => {
        try {
            exportToPDF(filteredParticipants, 'participants-list');
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            toast.error('Failed to export PDF');
        }
    };

    const handleExportExcel = () => {
        try {
            exportToExcel(filteredParticipants, 'participants-list');
            toast.success('Excel file downloaded successfully');
        } catch (error) {
            console.error('Error exporting Excel:', error);
            toast.error('Failed to export Excel');
        }
    };

    return (
        <>
            <div className="panel p-6 overflow-hidden bg-white dark:bg-slate-900 shadow-lg rounded-xl">
                {/* Header Section with Gradient */}
                <div className="relative mb-8 p-6 -mx-6 -mt-6 btn-gradient text-white rounded-t-xl">
                    <div className="flex md:items-center justify-between md:flex-row flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h5 className="text-xl font-bold">Participants List</h5>
                        </div>
                        
                        {/* Search and Export Controls */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search participants..."
                                    className="form-input w-full md:w-auto pl-9 pr-4 py-2 rounded-lg bg-white/10 border-white/20 text-white placeholder-white/70 focus:border-white focus:ring-white/30"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-2 top-2.5 h-5 w-5 text-white/70" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/20 text-white transition-all duration-200 flex items-center gap-2 hover:scale-105 transform"
                                    onClick={handleExportPDF}
                                    title="Export to PDF"
                                >
                                    <FileText size={18} />
                                    <span>PDF</span>
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/20 text-white transition-all duration-200 flex items-center gap-2 hover:scale-105 transform"
                                    onClick={handleExportExcel}
                                    title="Export to Excel"
                                >
                                    <FileSpreadsheet size={18} />
                                    <span>Excel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary border-l-transparent rounded-full animate-spin"></div>
                            <div className="w-16 h-16 border-4 border-primary/30 rounded-full absolute top-0 left-0"></div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                            <thead className="bg-gray-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone Number</th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-700">
                                {filteredParticipants.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No participants found</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredParticipants.map((participant) => (
                                        <tr 
                                            key={participant.id}
                                            className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {participant.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {participant.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {participant.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                                        title="Edit Participant"
                                                        onClick={() => handleEditClick(participant)}
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 dark:text-red-400 dark:hover:bg-red-900/20"
                                                        title="Delete Participant"
                                                        onClick={() => handleDeleteClick(participant._id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
    
            {/* Delete Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Participant"
                message="Are you sure you want to remove this participant? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeleting}
            />

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Participant"
            >
                {selectedParticipant && (
                    <EditParticipantForm
                        participant={selectedParticipant}
                        onSubmit={handleConfirmEdit}
                        onCancel={() => setIsEditModalOpen(false)}
                        isLoading={isEditing}
                    />
                )}
            </Modal>
        </>
    );
};

export default ParticipantsList;