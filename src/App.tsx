import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Activity, Position } from './types/activity';
import ActivityBubble from './components/activity-bubble';
import CreateActivity from './components/create-activity';
import MobileWarning from './components/mobile-warning';
import Web3 from 'web3';
import abi from './abi/pods-abi.json';
import WalletButton from './components/connect-wallet';
import NoWallet from './components/no-wallet';
import toast, { Toaster } from 'react-hot-toast';

export default function ActivityTracker() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [newActivity, setNewActivity] = useState<string>('');
	const [newOwner, setNewOwner] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [web3, setWeb3] = useState<Web3>();
	const [account, setAccount] = useState<string | null>();
	const [contract, setContract] = useState<any>(null);

	const contractAddress = '0x9FaA2517726Ff524c9C7C4D1FFd133B22F198884';

	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	const [positions, setPositions] = useState<Record<number, Position>>({});

	useEffect(() => {
		const newPositions: Record<number, Position> = {};
		const centerX = 50;
		const centerY = 50;
		const radius = 15;
		const spiralSpacing = 8;

		activities.forEach((activity, index) => {
			const angle = index * 0.8;
			const distance = radius + Math.floor(index / 8) * spiralSpacing;
			const x = centerX + Math.cos(angle) * distance;
			const y = centerY + Math.sin(angle) * distance;
			newPositions[activity.id] = { x, y };
		});

		setPositions(newPositions);
	}, [activities]);

	const addActivity = (): void => {
		const addActivityFn = async () => {
			await contract.methods
				.addActivity(newActivity.trim())
				.send({ from: account });
		};

		toast.promise(addActivityFn(), {
			loading: 'Submitting transaction to the blockchain...',
			success: 'Activity successfully added and confirmed on-chain',
			error: 'Transaction failed or was rejected',
		});

		if (newActivity.trim() && newOwner.trim()) {
			setActivities([
				...activities,
				{
					id: Date.now(),
					name: newActivity,
					owner: newOwner,
					participantCount: 0,
				},
			]);
			setNewActivity('');
			setNewOwner('');
		}
		fetchActivities();
		setOnClose();
	};

	const setOnClose = () => {
		setIsOpen(false);
	};

	const incrementActivity = async (id: number): Promise<void> => {
		await contract.methods.doingActivity(id).send({ from: account });
	};

	const connectWallet = async () => {
		if (!window.ethereum) {
			alert('Please install metamask');
		}

		const desiredChainId = '0x2105';

		try {
			const currentChainId = await window.ethereum.request({
				method: 'eth_chainId',
			});

			if (currentChainId !== desiredChainId) {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: desiredChainId }],
				});
			}
		} catch (error: any) {
			if (error.code === 4902) {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: desiredChainId,
							chainName: 'Base Mainnet',
							rpcUrls: ['https://mainnet.base.org'],
							nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
							blockExplorerUrls: ['https://basescan.org'],
						},
					],
				});
			}
		}

		const web3Instance = new Web3(window.ethereum);
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		const accounts = await web3Instance.eth.getAccounts();
		setWeb3(web3Instance);
		setAccount(accounts[0]);

		const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
		setContract(contractInstance);
	};

	useEffect(() => {
		if (account && contract) {
			fetchActivities();
		}
	}, [account, contract]);

	const fetchActivities = async () => {
		try {
			const activities = await contract.methods.getAllActivities().call();

			const formattedActivities = activities.map(
				(activity: any, index: number) => ({
					id: index,
					name: web3!.utils.hexToUtf8(activity.name),
					owner: activity.owner,
					participantCount: Number(activity.participantsCount),
					participants: activity.participants,
				})
			);

			setActivities(formattedActivities);
		} catch (error) {}
	};

	const disconnectWallet = () => {
		setAccount(null);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter') {
			addActivity();
		}
	};

	if (isMobile) {
		return <MobileWarning />;
	}

	return (
		<>
			<Toaster position="top-right" reverseOrder={true} />
			<div
				className="min-h-screen bg-gray-200 flex flex-col"
				style={{
					backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)`,
				}}
			>
				<WalletButton
					account={account}
					connectWallet={connectWallet}
					disconnectWallet={disconnectWallet}
				/>
				<CreateActivity
					isOpen={isOpen}
					onClose={setOnClose}
					newActivity={newActivity}
					setNewActivity={setNewActivity}
					addActivity={addActivity}
					handleKeyPress={handleKeyPress}
				/>
				{account ? (
					<ActivityBubble
						activities={activities}
						positions={positions}
						incrementActivity={incrementActivity}
					/>
				) : (
					<NoWallet />
				)}

				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-8 right-8 bg-black border-4 border-white w-16 h-16 flex items-center justify-center hover:bg-white hover:border-black group transition-all duration-200 z-50 hover:cursor-pointer"
					style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.8)' }}
				>
					<Plus
						size={32}
						className="text-white group-hover:text-black font-bold"
						strokeWidth={4}
					/>
				</button>

				<style>{`
        @keyframes float-0 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
          25% { transform: translate(-50%, -50%) translateY(-8px) translateX(5px); }
          75% { transform: translate(-50%, -50%) translateY(8px) translateX(-5px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(-50%, -50%) translateX(0px); }
          33% { transform: translate(-50%, -50%) translateX(-10px); }
          66% { transform: translate(-50%, -50%) translateX(10px); }
        }
      `}</style>
			</div>
		</>
	);
}
